package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.GapTimeVo;
import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticleTagRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.request.filter.FilterOotdRequestDto;
import com.cojeans.osiopso.dto.response.comment.CocommentResponseDto;
import com.cojeans.osiopso.dto.response.comment.CommentResponseDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.dto.tag.SearchTagResponseDto;
import com.cojeans.osiopso.entity.comment.Cocomment;
import com.cojeans.osiopso.entity.comment.Comment;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.comment.CocommentRepository;
import com.cojeans.osiopso.repository.comment.CommentLikeRepository;
import com.cojeans.osiopso.repository.comment.CommentRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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
            Tag tagSaved = tagRepository.save(Tag.builder()
                    .keyword(tag.getKeyword())
                    .type(tag.getType())
                    .build());

            ArticleTag articleTagE = ArticleTag.builder()
                    .article(ootdSaved)
                    .tag(tagSaved)
                    .build();

            articleTagRepository.save(articleTagE);
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


    public List<OotdListResponseDto> listOotd() {
        List<Ootd> Ootds = ootdRepository.findAllByDtype("O");
        List<OotdListResponseDto> list = new ArrayList<>();
        Date date = new Date();

        for (Ootd ootd : Ootds) {
            Date createTime = ootd.getCreateTime();

            long createT = createTime.getTime();
            long nowT = date.getTime();
            long timeGap = (nowT - createT) / 1000;
            float pastTime = timeGap / 1000;

//            System.out.println(createTime);
//            System.out.println(date);
//            System.out.println(createTime.getTime());
//            System.out.println(date.getTime());
//            System.out.println(nowT - createT);
//            System.out.println("================");
            String timeGapToString = "";

            // l/1000 는 초 단위
            if (timeGap < 60) {
                 timeGapToString = Long.toString(timeGap) + "s";
            } else if (timeGap < 3600) { // 60초 ~ 3600초(1분 ~ 60분) 는 분 단위
                timeGapToString = Long.toString(timeGap / 60) + "m";
            } else if (timeGap < 84000) { // 3601초 ~ 84000초 (1시간 ~ 24시간) 는 시간 단위
                timeGapToString = Long.toString(timeGap / 3600) + "h";
            } else if (timeGap < 2520000) { // 84001초 ~  (1일 ~ 30일) 는 일단위
                timeGapToString = Long.toString(timeGap / 84000) + "d";
            }


            List<ArticlePhoto> responsePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId());

            OotdListResponseDto dto = OotdListResponseDto.builder()
                    .id(ootd.getId())
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
                    .photo(ArticlePhotoResponseDto.builder()
                            .imageUrl(responsePhoto.get(0).getImageUrl())
                            .build())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                    .time(timeGapToString)
                    .pastTime(pastTime)
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
                    .build());
        }


        // 댓글 가져오기
        List<Comment> commentList = commentRepository.findAllByArticle_Id(articleNo);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        Date date = new Date();

        for (Comment comment : commentList) {
            // 대댓글인 경우에는 continue
            if (cocommentRepository.findByComment_Id(comment.getId()) != null){
                continue;
            }

            GapTimeVo commentGapTime = getGapTime(comment, date);

            List<Cocomment> cocommentList = cocommentRepository.findAllByRootId(comment.getId());
            List<CocommentResponseDto> cocommentResponseDtoList = new ArrayList<>();

            for (Cocomment cocomment : cocommentList) {
                System.out.println(cocommentResponseDtoList.size());
                if (cocommentResponseDtoList.size() == 3) {
                    break;
                }

                Comment getComment = commentRepository.findById(cocomment.getComment().getId()).orElseThrow();

                GapTimeVo cocommentGapTime = getGapTime(getComment, date);

                // 최초로 불러올 때에는 대댓글 3 개만 가져오기.
                cocommentResponseDtoList.add(CocommentResponseDto.builder()
                        .commentId(getComment.getId())
                        .content(getComment.getContent())
                        .userId(getComment.getUser().getId())
                        .report(getComment.getReport())
                        .time(cocommentGapTime.getTimeGapToString())
                        .pastTime(cocommentGapTime.getPastTime())
                        .depth(cocomment.getDepth())
                        .rootId(cocomment.getRootId())
                        .mentionId(cocomment.getMentionId())
                        .build());
            }

            commentResponseDtoList.add(CommentResponseDto.builder()
                    .commentId(comment.getId())
                    .content(comment.getContent())
                    .userId(comment.getUser().getId())
                    .report(comment.getReport())
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
                .createTime(ootd.getCreateTime())
                .modifyTime(ootd.getModifyTime())
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
                tagRepository.deleteById(at.getTag().getId());
            }
            return true;
        }


        for (ArticleTag at : articleTags) {
            old_tags.add(tagRepository.findById(at.getId()).orElseThrow());
            old_tags_keyword.add(tagRepository.findById(at.getId()).orElseThrow().getKeyword());
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
                tagRepository.deleteById(old_tag.getId());
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


    public void filterOotd(List<FilterOotdRequestDto> filter) {
    }



    public GapTimeVo getGapTime(Comment comment, Date date) {
        Date createTime = comment.getCreateTime();

        long createT = createTime.getTime();
        long nowT = date.getTime();
        long timeGap = (nowT - createT) / 1000;
        float pastTime = timeGap / 1000;
        String timeGapToString = "";

        // l/1000 는 초 단위
        if (timeGap < 60) {
            timeGapToString = Long.toString(timeGap) + "s";
        } else if (timeGap < 3600) { // 60초 ~ 3600초(1분 ~ 60분) 는 분 단위
            timeGapToString = Long.toString(timeGap / 60) + "m";
        } else if (timeGap < 84000) { // 3601초 ~ 84000초 (1시간 ~ 24시간) 는 시간 단위
            timeGapToString = Long.toString(timeGap / 3600) + "h";
        } else if (timeGap < 2520000) { // 84001초 ~  (1일 ~ 30일) 는 일단위
            timeGapToString = Long.toString(timeGap / 84000) + "d";
        }


        return GapTimeVo.builder()
                .pastTime(pastTime)
                .timeGapToString(timeGapToString)
                .build();
    }

    public List hotIssue() {

        return null;
    }
}
