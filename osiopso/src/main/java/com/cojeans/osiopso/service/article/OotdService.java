package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.GapTimeVo;
import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticleTagRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.request.filter.FilterOotdRequestDto;
import com.cojeans.osiopso.dto.response.comment.CocommentResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentLikeResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.dto.response.tag.HotTagResponseDto;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.dto.tag.SearchTagResponseDto;
import com.cojeans.osiopso.dto.user.Gender;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.comment.CommentLike;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.comment.CocommentRepository;
import com.cojeans.osiopso.repository.comment.CommentLikeRepository;
import com.cojeans.osiopso.repository.comment.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.UserDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class OotdService {

    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    private final ArticleRepository articleRepository;
    private final OotdRepository ootdRepository;
    private final ArticlePhotoRepository articlePhotoRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CocommentRepository cocommentRepository;
    private final ArticleTagRepositoryImpl articleTagRepositoryImpl;
    private final ArticleService articleService;
    private final CommentLikeRepository commentLikeRepository;
    private final OotdRepositoryImpl ootdRepositoryImpl;
    private final ArticleScrollQdslRepositoryImpl articleScrollQdslRepositoryImpl;


    public boolean createOotd(OotdRequestDto ootdRequestDto, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Pattern pattern = Pattern.compile("#[^\\s#]+");
        Matcher matcher = pattern.matcher(ootdRequestDto.getContent());


        // 게시물 저장
        Ootd ootdSaved = ootdRepository.save(Ootd.builder()
                .user(user)
                .hit(0)
                .content(ootdRequestDto.getContent())
                .report(0L)
                .build());


        // 사진 저장
        List<ArticlePhotoRequestDto> urls = ootdRequestDto.getUrls();

        for (ArticlePhotoRequestDto url : urls) {
            articlePhotoRepository.save(ArticlePhoto.builder()
                    .imageUrl(url.getImageUrl())
                    .article(ootdSaved)
                    .build());
        }



        // 태그 저장
        List<ArticleTagRequestDto> tags = ootdRequestDto.getTags();
        for (ArticleTagRequestDto tag : tags) {
            Tag findTag = tagRepository.findByKeyword(tag.getKeyword());
            Tag saveTag;

            if (findTag == null) {
                // 중복이 없는 경우 태그에 저장하고,
                Tag tagSaved = tagRepository.save(Tag.builder()
                        .keyword(tag.getKeyword())
                        .type(tag.getType())
                        .build());

                saveTag = tagSaved;
            } else {
                saveTag = tagRepository.findById(findTag.getId()).orElseThrow();
            }

            // article 태그에 저장한다.
            articleTagRepository.save(ArticleTag.builder()
                    .article(ootdSaved)
                    .tag(saveTag)
                    .build());
        }

        while (matcher.find()) {
            String hashTag = matcher.group();

            Tag tagSaved = tagRepository.save(Tag.builder()
                    .keyword(hashTag)
                    .type("H")
                    .build());

            ArticleTag articleTagE = ArticleTag.builder()
                    .article(ootdSaved)
                    .tag(tagSaved)
                    .build();

            articleTagRepository.save(articleTagE);
        }


        return true;
    }


    public List<OotdListResponseDto> listOotd(Pageable pageable, Long idx) {
        List<Ootd> Ootds;

        if (pageable == null) { // 필터링용
            Ootds = ootdRepository.findAllByDtype("O");
        } else {
            Ootds = articleScrollQdslRepositoryImpl.findNoOffsetOotdPaging(pageable, idx);
        }

        List<OotdListResponseDto> list = new ArrayList<>();
        Date date = new Date();

        for (Ootd ootd : Ootds) {
            GapTimeVo gapTime = articleService.getGapTime(ootd, date);

            List<ArticlePhoto> responsePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId());

            OotdListResponseDto dto = OotdListResponseDto.builder()
                    .id(ootd.getId())
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
                    .imageUrl(responsePhoto.get(0).getImageUrl())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                    .time(gapTime.getTimeGapToString())
                    .pastTime(gapTime.getPastTime())
                    .userId(ootd.getUser().getId())
                    .build();

            list.add(dto);
        }

        return list;
    }



    public OotdDetailResponseDto detailOotd(Long articleNo) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();

        // 사진 가져오기
        List<ArticlePhoto> photoEntityList = articlePhotoRepository.findAllByArticle_Id(articleNo);
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
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        Date date = new Date();

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

            // 해당 댓글에 달린 대댓글 리스트
            List<Cocomment> cocommentList = cocommentRepository.findAllByRootId(comment.getId());
            List<CocommentResponseDto> cocommentResponseDtoList = new ArrayList<>();


            // 댓글 좋아요 가져오기
            List<CommentLike> commentLikeList = commentLikeRepository.findAllByComment_Id(comment.getId());
            List<CommentLikeResponseDto> commentLikeResponseDtoList = new ArrayList<>();
            System.out.println(comment.getId());
            for (CommentLike cl : commentLikeList) {
                commentLikeResponseDtoList.add(CommentLikeResponseDto.builder()
                        .userId(cl.getUser().getId())
                        .commentId(cl.getComment().getId())
                        .userName(cl.getUser().getName())
                        .build());
            }


            for (Cocomment cocomment : cocommentList) {
                boolean likeCoco;
//                if (cocommentResponseDtoList.size() == 3) {
//                    break;
//                }

                // 좋아요가 눌려있다면
                if (commentLikeRepository.findByComment_Id(cocomment.getId()) != null) {
                    likeCoco = true;
                } else {
                    likeCoco = false;
                }

                Comment getComment = commentRepository.findById(cocomment.getComment().getId()).orElseThrow();
                GapTimeVo cocommentGapTime = articleService.getGapTime(getComment, date);


                // 대댓글 좋아요 가져오기
                List<CommentLike> cocommentLikeList = commentLikeRepository.findAllByComment_Id(cocomment.getComment().getId());
                List<CommentLikeResponseDto> cocommentLikeResponseDtoList = new ArrayList<>();
                System.out.println(cocomment.getId());
                for (CommentLike cl : cocommentLikeList) {
                    cocommentLikeResponseDtoList.add(CommentLikeResponseDto.builder()
                            .userId(cl.getUser().getId())
                            .commentId(cl.getComment().getId())
                            .userName(cl.getUser().getName())
                            .build());
                }

                System.out.println(cocomment.getMentionId());


                cocommentResponseDtoList.add(CocommentResponseDto.builder()
                        .commentId(getComment.getId())
                        .content(getComment.getContent())
                        .userId(getComment.getUser().getId())
                        .report(getComment.getReport())
                        .like(likeCoco)
                        .commentLikes(cocommentLikeResponseDtoList)
                        .profileImageUrl(comment.getUser().getImageUrl())
                        .imageUrl(comment.getUser().getImageUrl())
                        .userName(comment.getUser().getName())
                        .time(cocommentGapTime.getTimeGapToString())
                        .pastTime(cocommentGapTime.getPastTime())
                        .depth(cocomment.getDepth())
                        .rootId(cocomment.getRootId())
                        .mentionId(cocomment.getMentionId())
                        .mentionName(cocomment.getMentionName())
                        .build());
            }

            commentResponseDtoList.add(CommentResponseDto.builder()
                    .commentId(comment.getId())
                    .content(comment.getContent())
                    .userId(comment.getUser().getId())
                    .report(comment.getReport())
                    .cocommentCnt((long) cocommentRepository.findAllByRootId(comment.getUser().getId()).size())
                    .like(likeCo)
                    .commentLikes(commentLikeResponseDtoList)
                    .imageUrl(comment.getUser().getImageUrl())
                    .userName(comment.getUser().getName())
                    .time(commentGapTime.getTimeGapToString())
                    .pastTime(commentGapTime.getPastTime())
                    .cocoments(cocommentResponseDtoList)
                    .build());
        }


        // 태그 가져오기
        // 1. 게시물 번호를 통해서 articleTag 들을 찾아온다.
        // 2. articleTag 의 article_Id를 통해서
        List<ArticleTag> tagEntityList = articleTagRepository.findByArticle_Id(articleNo);
        List<ArticleTagResponseDto> tagResponseDtoList = new ArrayList<>();

        for (ArticleTag at : tagEntityList) {
            // tagId
            Long tagId = at.getTag().getId();
            Tag tag = tagRepository.findById(tagId).orElseThrow();

            tagResponseDtoList.add(ArticleTagResponseDto.builder()
                    .id(tag.getId())
                    .keyword(tag.getKeyword())
                    .type(tag.getType())
                    .build());
        }


        return OotdDetailResponseDto.builder()
                .id(ootd.getId())
                .userId(ootd.getUser().getId())
                .userName(ootd.getUser().getName())
                .createTime(ootd.getCreateTime())
                .modifyTime(ootd.getModifyTime())
                .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                .photos(photoResponseDtoList)
                .tags(tagResponseDtoList)
                .articleLikes(articleLikeResponseDtoList)
                .comments(commentResponseDtoList)
                .hit(ootd.getHit())
                .content(ootd.getContent())
                .build();
    }



    public boolean editOotd(Long articleNo, OotdRequestDto ootdRequestDto, Long userId) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();
        Date createTime = ootd.getCreateTime();

        // 게시글 작성자만 수정권한이 있다.
        if (userId != ootd.getUser().getId()) {
            return false;
        }

        // ========================= 태그수정 로직 ================================
        // 기존 태그 : 1, 2, 3 => 1, 2, 3, 4
        // 새로운 태그 : 2, 3, 4
        // 1. 새로운 태그를 돌리면서 기존태그에 없다면 추가한다.
        // 2. 기존 태그를 돌리면서 추가할 새로운 태그에 없다면 삭제한다.

        List<ArticleTag> articleTags = articleTagRepository.findByArticle_Id(ootd.getId());
        List<String> old_tags_keyword = new ArrayList<>();
        List<String> new_tags_keyword = new ArrayList<>();
        List<Tag> old_tags = new ArrayList<>();

        // 태그를 모두 삭제하려는 경우
        if (ootdRequestDto.getTags().size() == 0) {
            List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(articleNo);

            for (ArticleTag at : articleTag) {
                System.out.println(at.getTag().getKeyword() + " 삭제!");
                articleTagRepository.deleteById(at.getId());
//                tagRepository.deleteById(at.getTag().getId());
            }
            return true;
        }


        for (ArticleTag at : articleTags) {
            old_tags.add(tagRepository.findById(at.getTag().getId()).orElseThrow());
            old_tags_keyword.add(tagRepository.findById(at.getTag().getId()).orElseThrow().getKeyword());
        }



        for (ArticleTagRequestDto new_tag : ootdRequestDto.getTags()) {
            String keyword = new_tag.getKeyword();
            new_tags_keyword.add(keyword);

            // 1. 만약 기존 태그에 새로운 태그가 없는 경우 -> 저장
            if (!old_tags_keyword.contains(keyword)) {
                Tag tagE = Tag.builder()
                        .type(new_tag.getType())
                        .keyword(new_tag.getKeyword())
                        .build();
                // 기존 태그 리스트에 새로운 태그 추가
                old_tags.add(tagE);
                Tag tagSaved = tagRepository.save(tagE);

                ArticleTag articleTagE = ArticleTag.builder()
                        .article(ootd)
                        .tag(tagSaved)
                        .build();

                articleTagRepository.save(articleTagE);
            }
        }

        for (Tag old_tag : old_tags) {
            // 2. 만약 추가할 태그에, 추가한 기존 태그가 없는 경우 => 삭제
            if (!new_tags_keyword.contains(old_tag.getKeyword())) {
                articleTagRepository.deleteById(old_tag.getId());
//                tagRepository.deleteById(old_tag.getId());
            }
        }

        // ========================= 사진수정 로직 ================================
        // 기존 사진 : 1, 2, 3 => 1, 2, 3, 4
        // 새로운 사진 : 2, 3, 4
        // 1. 새로운 사진을 돌리면서 기존사진에 없다면 추가한다.
        // 2. 기존 사진을 돌리면서 추가할 새로운 태그에 없다면 삭제한다.
        // 나중에 사진 업로드 완성되면 할 예정

        // 기존의 게시물 사진 모두 삭제
        articlePhotoRepository.deleteAllByArticle_Id(articleNo);

        // 새로운 게시물 사진 추가
        List<ArticlePhotoRequestDto> urls = ootdRequestDto.getUrls();

        for (ArticlePhotoRequestDto url : urls) {
            articlePhotoRepository.save(ArticlePhoto.builder()
                    .imageUrl(url.getImageUrl())
                    .article(ootd)
                    .build());
        }


        articleRepository.save(Ootd.builder()
                .id(articleNo)
                .user(userRepository.getById(userId))
                .content(ootdRequestDto.getContent())
                .createTime(createTime)
                .build());

        return true;
    }


    public OotdSearchByHashtagResponseDto searchOotdByHashtag(String input) {
        // 해당 검색 해쉬태그를 contain("input%")한 태그들을 모두 찾아온다.
        List<Tag> tags = tagRepository.findAllByKeywordStartingWith(input);
        List<OotdSearchResponseDto> ootdSearchResponseDtoList = new ArrayList<>();

        HashMap<String, Long> tagMap = new HashMap<>();


        for (Tag tag : tags) {
            // 태그가 없다면?
            if (tagMap.get(tag.getKeyword()) == null) {
                tagMap.put(tag.getKeyword(), 1L);
            } else {
                // 이미 있는 태그라면 개수 + 1
                tagMap.replace(tag.getKeyword(),tagMap.get(tag.getKeyword()) + 1);
            }

            // tag와 article의 연관정보를 담고 있는 articleTag를 tag_id를 통해 조회합니다.
            List<ArticleTag> articleTagList = articleTagRepository.findAllByTag_Id(tag.getId());


            for (ArticleTag articleTag : articleTagList) {
                // articleTag를 통해 해당 태그가 등록된 게시물의 Id를 통해 게시물을 찾아옵니다.
                Ootd ootd = ootdRepository.findById(articleTag.getArticle().getId()).orElseThrow();

                // 해당 게시물의 Id를 통해 대표사진으로 사용할 사진을 찾아옵니다. (사진 배열의 가장 첫 번째 인덱스)
                ArticlePhoto articlePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId()).get(0);

                // 프론트 단에 넘겨줄 ootdSearchResponseDto를 생성합니다. (사진, 댓글 수, 좋아요 수
                ootdSearchResponseDtoList.add(OotdSearchResponseDto.builder()
                                .articleNo(articleTag.getArticle().getId())
                        .photo(ArticlePhotoResponseDto.builder()
                                .imageUrl(articlePhoto.getImageUrl())
                                .build())
                        .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                        .likeCnt((long) articleLikeRepository.findAllByArticle_Id(ootd.getId()).size())
                        .build());
            }
        }

        List<String> keySetList = new ArrayList<>(tagMap.keySet());
        Collections.sort(keySetList, (o1, o2) -> (tagMap.get(o2).compareTo(tagMap.get(o1))));

        List<SearchTagResponseDto> searchTagResponseDtoList = new ArrayList<>();

        for(String key : keySetList) {
            searchTagResponseDtoList.add(SearchTagResponseDto.builder()
                    .keyword(key)
                    .cnt(tagMap.get(key))
                    .build());
        }


        // 프론트에 넘어가야 할 정보
        // 태그들의 종류, 종류당 개수 / 검색 결과로 보여줄 게시물 정보
        return  OotdSearchByHashtagResponseDto.builder()
                .ootdSearchResponseDtoList(ootdSearchResponseDtoList)
                .tagInfo(searchTagResponseDtoList)
                .build();
    }


    public List<OotdListResponseDto> filterOotd(FilterOotdRequestDto filter) {
        List<String> styleTag = filter.getStyleTag();
        List<String> tpoTag = filter.getTpo();
        Long age = filter.getAge();
        Gender gender = filter.getGender();


        List<OotdListResponseDto> listOotd = listOotd(null, 0L);
        List<OotdListResponseDto> responseOotdList = new ArrayList<>();

        // 아무 필터도 적용되지 않은 경우
        if (styleTag.size() == 0 && tpoTag.size() == 0 && age == null && gender == null) {
            return null;
        }


        // 전체 게시물 목록을 뒤져보자
        for (OotdListResponseDto dto : listOotd) {
            // 태그가 존재할 때에만..
            if (styleTag != null || tpoTag != null) {
                // 해당 게시물에 등록된 태그들을 가져오자
                List<ArticleTag> articleTagList = articleTagRepository.findAllByArticle_Id(dto.getId());
                List<String> tagList = new ArrayList<>();
                int styleCnt = 0, tpoCnt = 0;


                // 게시물에 등록된 태그들의 모든 keyword 들을 가져온다.
                for (ArticleTag articleTag : articleTagList) {
                    String keyword = tagRepository.findById(articleTag.getTag().getId()).orElseThrow().getKeyword();
                    tagList.add(keyword);
                }

                // style 태그가 존재할 때에만..
                if (styleTag != null) {
                    // 필터링 할 스타일 태그가 기존 태그들에 포함되어있다면 cnt ++
                    for (String keyword : styleTag) {
                        if (tagList.contains(keyword)) styleCnt++;
                    }
                }


                if (tpoTag != null) {
                    // 필터링 할 tpo 태그가 기존 태그들에 포함되어있다면 cnt ++
                    for (String keyword : tpoTag) {
                        if (tagList.contains(keyword)) tpoCnt++;
                    }
                }

                User user = userRepository.findById(dto.getUserId()).orElseThrow();

                // 성별을 선택하지 않은경우
                if (gender == null) {
                    gender = user.getGender();
                }

                // 나이를 선택하지 않은경우
                if (age == null) {
                    age = (long) (user.getAge() / 10);
                }

                // 스타일, tpo 태그들 모두 다 찾고, 성별과 나이대도 일치할 경우..
                if (styleTag.size() == styleCnt &&
                        tpoTag.size() == tpoCnt &&
                        user.getGender() == gender &&
                        user.getAge() / 10 == age) {
                    responseOotdList.add(dto);
                }
            }
        }
        return responseOotdList;
    }

    // 전제 : article_tag에 createTime 컬럼 추가
    // 1개월 내로 생성된 article_tag 리스트 뽑기
    // group by tag_id count : 태그 별 개수 카운팅
    // 내림차순 정렬 ~ 4등까지 -> 해시태그 탭 선택지로 만들기
    // + 이후 ? 해당 탭을 누르면 좋아요를 기준으로 인기글 5개 뽑기

    public List<HotTagResponseDto> hotIssue() {
        List<Long> list = articleTagRepositoryImpl.findByArticleId(LocalDate.now());
        List<HotTagResponseDto> result = new ArrayList<>();
        for(Long id : list){
            System.out.println("id : ----- " + id);

            Tag tag = tagRepository.findById(id).orElseThrow();
            result.add(HotTagResponseDto.builder()
                    .id(tag.getId())
                    .keyword(tag.getKeyword())
                    .build());
        }
        return result;
    }

    public List<HotOotdResponseDto> hotIssueList(Long tagId) {
        // 특정 태그를 포함하는 게시물 중 최신순으로?인기순으로?
        List<ArticleTag> articleTags = articleTagRepository.findTop8ByTagIdOrderByIdDesc(tagId);
        List<HotOotdResponseDto> result = new ArrayList<>();

        for (ArticleTag at : articleTags) {
            Ootd ootd = ootdRepository.findById(at.getArticle().getId()).orElseThrow();
            ArticlePhoto ap = articlePhotoRepository.findTopByArticleId(ootd.getId());
            result.add(HotOotdResponseDto.builder()
                            .id(ootd.getId())
                            .imageUrl(ap.getImageUrl())
                    .build());
        }

        return result;
    }
    public List<OotdListResponseDto> followOotd(UserDetail userDetail) {
//        select * from article
//        where user_id
//        in (select following_id from follow where follower_id = 2)
//        order by id desc;
        List<Article> articles = ootdRepositoryImpl.findByUserId(userDetail.getId());
        List<OotdListResponseDto> result = new ArrayList<>();

        Date date = new Date();

        for (Article article : articles) {
            GapTimeVo gapTime = articleService.getGapTime(article, date);
            ArticlePhoto ap = articlePhotoRepository.findTopByArticleId(article.getId());

            result.add(OotdListResponseDto.builder()
                    .id(article.getId())
                    .pastTime(gapTime.getPastTime())
                    .time(gapTime.getTimeGapToString())
                    .userId(article.getUser().getId())
                    .imageUrl(ap.getImageUrl())
                    .hit(article.getHit())
                    .build());
        }

        return result;
    }
}
