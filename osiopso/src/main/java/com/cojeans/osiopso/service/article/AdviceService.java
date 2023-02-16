package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.GapTimeVo;
import com.cojeans.osiopso.dto.request.feed.AdviceRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.dto.response.comment.CommentAdviceResponseDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.comment.CommentPhoto;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticleLike;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.comment.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.PriorityQueue;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class AdviceService {

    private final ArticleRepository articleRepository;
    private final AdviceRepository adviceRepository;
    private final ArticlePhotoRepository articlePhotoRepository;
    private final CocommentRepository cocommentRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepositoryImpl commentRepositoryImpl;
    private final ArticleService articleService;
    private final ArticleScrollQdslRepositoryImpl articleScrollQdslRepositoryImpl;
    private final CommentPhotoRepository commentPhotoRepository;
    private final AdviceRepositoryImpl adviceRepositoryImpl;

    public boolean createAdvice(AdviceRequestDto adviceRequestDto, Long id) {
        User user = userRepository.findById(id).orElseThrow();


        // 게시물 저장
        Advice adviceSaved = adviceRepository.save(Advice.builder()
                .user(user)
                .hit(0)
                .content(adviceRequestDto.getContent())
                .subject(adviceRequestDto.getSubject())
                .isSelected(adviceRequestDto.isSelected())
                .report(0L)
                .build());


        // 사진 저장
        List<ArticlePhotoRequestDto> urls = adviceRequestDto.getUrls();

        for (ArticlePhotoRequestDto url : urls) {
            articlePhotoRepository.save(ArticlePhoto.builder()
                    .imageUrl(url.getImageUrl())
                    .article(adviceSaved)
                    .build());
        }

        return true;
    }


    public List<AdviceListResponseDto> listAdvice(Pageable pageable, Long idx) {
        List<Advice> Advices = articleScrollQdslRepositoryImpl.findNoOffsetAdvicePaging(pageable, idx);

        List<AdviceListResponseDto> list = new ArrayList<>();
        Date date = new Date();

        for (Advice advice : Advices) {
            Long issueScore = 0L;

            GapTimeVo gapTime = articleService.getGapTime(advice, date);
            List<ArticlePhoto> responsePhoto = articlePhotoRepository.findAllByArticle_Id(advice.getId());

            Article article = articleRepository.findById(advice.getId()).orElseThrow();

            // 게시물의 댓글 수
            int commentSize = commentRepository.findAllByArticle_Id(article.getId()).size();
            // 게시물의 좋아요 수
            int likeSize = articleLikeRepository.findAllByArticle_Id(article.getId()).size();

            issueScore += ((commentSize * 4) + (likeSize * 2) + (advice.getHit()) * 1);

            AdviceListResponseDto dto = AdviceListResponseDto.builder()
                    .id(advice.getId())
                    .hit(advice.getHit())
                    .content(advice.getContent())
                    .subject(advice.getSubject())
                    .photo(ArticlePhotoResponseDto.builder()
                            .imageUrl(responsePhoto.get(0).getImageUrl())
                            .build())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
                    .userId(advice.getUser().getId())
                    .isSelected(advice.isSelected())
                    .time(gapTime.getTimeGapToString())
                    .pastTime(gapTime.getPastTime())
                    .issueScore(issueScore)
                    .build();
            list.add(dto);
        }

        return list;
    }


    // 1. param 으로 훈수 찾아오기
    // 2. 훈수 게시물 Id로 articleTag 찾아오기
    // 3. articleTag iterator 돌려서 id로 keyword
    public AdviceDetailResponseDto detailAdvice(Long articleNo, Long userId) {
        Advice advice = adviceRepository.findById(articleNo).orElseThrow();

        // 사진 가져오기
        List<ArticlePhoto> photoEntityList = articlePhotoRepository.findAllByArticle_Id(advice.getId());
        List<ArticlePhotoResponseDto> photoResponseDtoList = new ArrayList<>();


        for (ArticlePhoto ap : photoEntityList) {
            photoResponseDtoList.add(ArticlePhotoResponseDto.builder()
                    .imageUrl(ap.getImageUrl())
                    .build());
        }


        // 게시물 좋아요 가져오기
        // DataFormat) x 유저가 좋아요를 눌렀다.
        List<ArticleLike> articleLikeList = articleLikeRepository.findAllByArticle_Id(articleNo);
        List<ArticleLikeResponseDto> articleLikeResponseDtoList = new ArrayList<>();

        for (ArticleLike al : articleLikeList) {
            articleLikeResponseDtoList.add(ArticleLikeResponseDto.builder()
                    .id(al.getId())
                    .userId(al.getUser().getId())
                    .userName(al.getUser().getName())
                    .build());
        }


        // 댓글 가져오기
        List<Comment> commentList = commentRepository.findAllByArticle_Id(articleNo);
        List<CommentAdviceResponseDto> commentAdviceResponseDtoList = new ArrayList<>();
        Date date = new Date();

        // 해당 게시물에 달린 모든 댓글 리스트
        for (Comment comment : commentList) {
            boolean likeCo;

            // 대댓글인 경우에는 continue
            if (cocommentRepository.findByComment_Id(comment.getId()) != null){
                continue;
            }

            // 좋아요가 눌려있다면
            if (commentLikeRepository.findByComment_Id(comment.getId()) != null) {
                likeCo = true;
            } else {
                likeCo = false;
            }

            GapTimeVo commentGapTime = articleService.getGapTime(comment, date);

            // 해당 훈수에 달린 댓글의 사진 가져오기
            CommentPhoto commentPhoto = commentPhotoRepository.findByArticle_IdAndComment_Id(comment.getArticle().getId(), comment.getId());

            // 댓글 좋아요 가져오기
//            List<CommentLike> commentLikeList = commentLikeRepository.findAllByComment_Id(comment.getId());
//            List<CommentLikeResponseDto> commentLikeResponseDtoList = new ArrayList<>();
//            System.out.println(comment.getId());
//            for (CommentLike cl : commentLikeList) {
//                commentLikeResponseDtoList.add(CommentLikeResponseDto.builder()
//                        .userId(cl.getUser().getId())
//                        .commentId(cl.getComment().getId())
//                        .build());
//            }


            commentAdviceResponseDtoList.add(CommentAdviceResponseDto.builder()
                    .commentId(comment.getId())
                    .content(comment.getContent())
                    .userId(comment.getUser().getId())
                    .report(comment.getReport())
                    .like(likeCo)
                    .profileImageUrl(comment.getUser().getImageUrl())
                    .imageUrl(commentPhoto.getImageUrl())
                    .userName(comment.getUser().getName())
                    .time(commentGapTime.getTimeGapToString())
                    .pastTime(commentGapTime.getPastTime())
                    .up(comment.getUp())
                    .down(comment.getDown())
                    .isSelected(comment.getIsSelected())
                    .build());
        }


        // 게시물의 작성자는 조회수를 증가시키지 않는다.
        if (advice.getUser().getId() != userId) {
            System.out.println(advice.getHit());
            articleRepository.save(Advice.builder()
                    .id(articleNo)
                    .hit(advice.getHit() + 1)
                    .user(advice.getUser())
                    .subject(advice.getSubject())
                    .isSelected(advice.isSelected())
                    .content(advice.getContent())
                    .createTime(advice.getCreateTime())
                    .modifyTime(advice.getModifyTime())
                    .report(advice.getReport())
                    .build());
        }


        return AdviceDetailResponseDto.builder()
                .id(advice.getId())
                .userId(advice.getUser().getId())
                .userName(advice.getUser().getName())
                .createTime(advice.getCreateTime())
                .modifyTime(advice.getModifyTime())
                .profileImageUrl(advice.getUser().getImageUrl())
                .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
                .photos(photoResponseDtoList)
                .articleLikes(articleLikeResponseDtoList)
                .comments(commentAdviceResponseDtoList)
                .hit(advice.getHit())
                .content(advice.getContent())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .build();
    }


    public boolean editAdvice(Long articleNo, AdviceRequestDto adviceRequestDto, Long userId) {
        Advice advice = adviceRepository.findById(articleNo).orElseThrow();
        Date createTime = advice.getCreateTime();

        // 게시글 작성자만 수정권한이 있다.
        if (userId != advice.getUser().getId()) {
            return false;
        }

        // ========================= 사진수정 로직 ================================
        // 기존 사진 : 1, 2, 3 => 1, 2, 3, 4
        // 새로운 사진 : 2, 3, 4
        // 1. 새로운 사진을 돌리면서 기존사진에 없다면 추가한다.
        // 2. 기존 사진을 돌리면서 추가할 새로운 태그에 없다면 삭제한다.
        // 나중에 사진 업로드 완성되면 할 예정
        // 이거 유기했음 ㅋㅋ

        // 기존의 게시물 사진 모두 삭제
        articlePhotoRepository.deleteAllByArticle_Id(articleNo);

        // 새로운 게시물 사진 추가
        List<ArticlePhotoRequestDto> urls = adviceRequestDto.getUrls();

        for (ArticlePhotoRequestDto url : urls) {
            articlePhotoRepository.save(ArticlePhoto.builder()
                    .imageUrl(url.getImageUrl())
                    .article(advice)
                    .build());
        }

        articleRepository.save(Advice.builder()
                .id(articleNo)
                .user(userRepository.getById(userId))
                .subject(adviceRequestDto.getSubject())
                .isSelected(adviceRequestDto.isSelected())
                .content(adviceRequestDto.getContent())
                .createTime(createTime)
                .report(advice.getReport())
                .build());

        return true;
    }


    public List<AdviceSearchResponseDto> searchAdviceBySubject(String subject) {
        List<Advice> adviceList = adviceRepository.findAllBySubjectContaining(subject);
        List<AdviceSearchResponseDto> list = new ArrayList<>();
        Date date = new Date();

        for (Advice advice : adviceList) {
            List<ArticlePhoto> articlePhotoList = articlePhotoRepository.findAllByArticle_Id(advice.getId());
            ArticlePhoto articlePhoto = articlePhotoList.get(0);

            GapTimeVo gapTime = articleService.getGapTime(advice, date);

            list.add(AdviceSearchResponseDto.builder()
                    .articleNo(advice.getId())
                    .subject(advice.getSubject())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
                    .imageUrl(articlePhoto.getImageUrl())
                    .isSelected(advice.isSelected())
                    .time(gapTime.getTimeGapToString())
                    .pastTime(gapTime.getPastTime())
                    .build());
        }

        return list;
    }


    public List<AdviceSearchResponseDto> searchAdviceByContent(String content) {
        List<Advice> adviceList = adviceRepository.findAllByContentContaining(content);
        List<AdviceSearchResponseDto> list = new ArrayList<>();
        Date date = new Date();

        for (Advice advice : adviceList) {
            List<ArticlePhoto> articlePhotoList = articlePhotoRepository.findAllByArticle_Id(advice.getId());
            ArticlePhoto articlePhoto = articlePhotoList.get(0);

            GapTimeVo gapTime = articleService.getGapTime(advice, date);

            list.add(AdviceSearchResponseDto.builder()
                    .articleNo(advice.getId())
                    .subject(advice.getSubject())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
                    .imageUrl(articlePhoto.getImageUrl())
                    .isSelected(advice.isSelected())
                    .time(gapTime.getTimeGapToString())
                    .pastTime(gapTime.getPastTime())
                    .build());
        }

        return list;
    }

    public List<BurningAdviceResponseDto> burnList() {
        // 현재 날짜를 기준으로 1개월 내에 쓰여진 훈수 글
        // List<Advice> adviceList = adviceRepository.findAllByCreateTimeGreaterThanEqualAndCreateTimeLessThanEqual(before, now);

        // 해당 글들의 댓글 수를 기준으로 내림차순 정렬
        // count gruopby를 생각 -> QueryDSL 이용해야 함
        // select article_id, count(*) as count from comment
        // where article_id
        // in (select id from article where create_time >= date_sub(now(), interval 1 month) and create_time <= now())
        // group by article_id
        // order by count desc;

//        List<Long> list = commentRepositoryImpl.findByArticleId(LocalDate.now());
//
//        List<BurningAdviceResponseDto> result = new ArrayList<>();
//
//        for (Long id : list) {
//            System.out.println("id : ---- " + id);
//            ArticlePhoto ap = articlePhotoRepository.findTopByArticleId(id);
//            Advice advice = adviceRepository.findById(id).orElseThrow();
//            BurningAdviceResponseDto responseDto = BurningAdviceResponseDto.builder()
//                    .id(advice.getId())
//                    .photo(ArticlePhotoResponseDto.builder()
//                            .imageUrl(ap.getImageUrl())
//                            .build())
//                    .hit(advice.getHit())
//                    .subject(advice.getSubject())
//                    .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
//                    .build();
//
//            result.add(responseDto);
//        }

        List<Article> adviceList = adviceRepositoryImpl.findByDate(LocalDate.now());
        List<BurningAdviceResponseDto> result = new ArrayList<>();

        if(adviceList.size() != 0) {
            List<Long> commentCount = new ArrayList<>();
            for (Article article : adviceList) {
                commentCount.add(commentRepository.countByArticleId(article.getId()));
            }

            PriorityQueue<Long[]> pq = new PriorityQueue<>((o1, o2) -> Math.toIntExact(o2[1] - o1[1]));
            for (int i = 0; i < adviceList.size(); i++) {
                pq.add(new Long[]{adviceList.get(i).getId(), commentCount.get(i)});
            }

            List<Long> idList = new ArrayList<>();
            if(pq.size() > 8){
                for (int i = 0; i < 8; i++) {
                    idList.add(pq.poll()[0]);
                }
            } else{
                int index = pq.size();
                for (int i = 0; i < index; i++) {
                    idList.add(pq.poll()[0]);
                }
            }

            for (Long id : idList) {
                System.out.println("???? : " + id);
                ArticlePhoto ap = articlePhotoRepository.findTopByArticleId(id);
                Advice advice = adviceRepository.findById(id).orElseThrow();
                BurningAdviceResponseDto responseDto = BurningAdviceResponseDto.builder()
                        .id(advice.getId())
                        .photo(ArticlePhotoResponseDto.builder()
                                .imageUrl(ap.getImageUrl())
                                .build())
                        .hit(advice.getHit())
                        .subject(advice.getSubject())
                        .commentCnt((long) commentRepository.findAllByArticle_Id(advice.getId()).size())
                        .build();

                result.add(responseDto);
            }
        }
        return result;
    }
}