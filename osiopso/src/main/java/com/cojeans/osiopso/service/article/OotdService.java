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
import com.cojeans.osiopso.entity.user.Gender;
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
import com.cojeans.osiopso.repository.user.FollowRepository;
import com.cojeans.osiopso.repository.user.UserRepository;
import com.cojeans.osiopso.security.UserDetail;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
    private final FollowRepository followRepository;


    public boolean createOotd(OotdRequestDto ootdRequestDto, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        Pattern pattern = Pattern.compile("#[^\\s#]+");
        Matcher matcher = pattern.matcher(ootdRequestDto.getContent());


        // ????????? ??????
        Ootd ootdSaved = ootdRepository.save(Ootd.builder()
                .user(user)
                .hit(0)
                .content(ootdRequestDto.getContent())
                .report(0L)
                .build());


        // ?????? ??????
        List<ArticlePhotoRequestDto> urls = ootdRequestDto.getUrls();

        for (ArticlePhotoRequestDto url : urls) {
            articlePhotoRepository.save(ArticlePhoto.builder()
                    .imageUrl(url.getImageUrl())
                    .article(ootdSaved)
                    .build());
        }



        // ?????? ??????
        List<ArticleTagRequestDto> tags = ootdRequestDto.getTags();
        for (ArticleTagRequestDto tag : tags) {
            Tag findTag = tagRepository.findByKeyword(tag.getKeyword());
            Tag saveTag;

            if (findTag == null) {
                // ????????? ?????? ?????? ????????? ????????????,
                Tag tagSaved = tagRepository.save(Tag.builder()
                        .keyword(tag.getKeyword())
                        .type(tag.getType())
                        .build());

                saveTag = tagSaved;
            } else {
                saveTag = tagRepository.findById(findTag.getId()).orElseThrow();
            }

            // article ????????? ????????????.
            articleTagRepository.save(ArticleTag.builder()
                    .article(ootdSaved)
                    .tag(saveTag)
                    .build());
        }

        while (matcher.find()) {
            String hashTag = matcher.group();
            Tag findTag = tagRepository.findByKeyword(hashTag);
            Tag saveTag;

            if (findTag == null) {
                Tag tagSaved = tagRepository.save(Tag.builder()
                        .keyword(hashTag)
                        .type("H")
                        .build());

                saveTag = tagSaved;
            } else {
                saveTag = tagRepository.findById(findTag.getId()).orElseThrow();
            }

            articleTagRepository.save(ArticleTag.builder()
                    .article(ootdSaved)
                    .tag(saveTag)
                    .build());
        }


        return true;
    }


    public List<OotdListResponseDto> listOotd(Pageable pageable, Long idx) {
        List<Ootd> Ootds;


        Ootds = articleScrollQdslRepositoryImpl.findNoOffsetOotdPaging(pageable, idx);

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

        // ?????? ????????????
        List<ArticlePhoto> photoEntityList = articlePhotoRepository.findAllByArticle_Id(articleNo);
        List<ArticlePhotoResponseDto> photoResponseDtoList = new ArrayList<>();

        for (ArticlePhoto ap : photoEntityList) {
            photoResponseDtoList.add(ArticlePhotoResponseDto.builder()
                    .imageUrl(ap.getImageUrl())
                    .build());
        }


        // ????????? ????????? ????????????
        // DataFormat) x ????????? ???????????? ?????????.
        List<ArticleLike> articleLikeList = articleLikeRepository.findAllByArticle_Id(articleNo);
        List<ArticleLikeResponseDto> articleLikeResponseDtoList = new ArrayList<>();

        for (ArticleLike al : articleLikeList) {
            articleLikeResponseDtoList.add(ArticleLikeResponseDto.builder()
                    .id(al.getId())
                    .userId(al.getUser().getId())
                    .userName(al.getUser().getName())
                    .build());
        }




        // ?????? ????????????
        List<Comment> commentList = commentRepository.findAllByArticle_Id(articleNo);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        Date date = new Date();

        for (Comment comment : commentList) {
            boolean likeCo;

            // ???????????? ???????????? continue
            if (cocommentRepository.findByComment_Id(comment.getId()) != null){
                continue;
            }


            // ???????????? ???????????????
            if (commentLikeRepository.findByComment_Id(comment.getId()) != null) {
                likeCo = true;
            } else {
                likeCo = false;
            }

            GapTimeVo commentGapTime = articleService.getGapTime(comment, date);

            // ?????? ????????? ?????? ????????? ?????????
            List<Cocomment> cocommentList = cocommentRepository.findAllByRootId(comment.getId());
            List<CocommentResponseDto> cocommentResponseDtoList = new ArrayList<>();


            // ?????? ????????? ????????????
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

                // ???????????? ???????????????
                if (commentLikeRepository.findByComment_Id(cocomment.getId()) != null) {
                    likeCoco = true;
                } else {
                    likeCoco = false;
                }

                Comment getComment = commentRepository.findById(cocomment.getComment().getId()).orElseThrow();
                GapTimeVo cocommentGapTime = articleService.getGapTime(getComment, date);


                // ????????? ????????? ????????????
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
                        .profileImageUrl(getComment.getUser().getImageUrl())
                        .userName(getComment.getUser().getName())
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
                    .profileImageUrl(comment.getUser().getImageUrl())
                    .userName(comment.getUser().getName())
                    .time(commentGapTime.getTimeGapToString())
                    .pastTime(commentGapTime.getPastTime())
                    .cocoments(cocommentResponseDtoList)
                    .build());
        }


        // ?????? ????????????
        // 1. ????????? ????????? ????????? articleTag ?????? ????????????.
        // 2. articleTag ??? article_Id??? ?????????
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
                .profileImageUrl(ootd.getUser().getImageUrl())
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

        // ????????? ???????????? ??????????????? ??????.
        if (userId != ootd.getUser().getId()) {
            return false;
        }

        // ========================= ???????????? ?????? ================================
        // ?????? ?????? : 1, 2, 3 => 1, 2, 3, 4
        // ????????? ?????? : 2, 3, 4
        // 1. ????????? ????????? ???????????? ??????????????? ????????? ????????????.
        // 2. ?????? ????????? ???????????? ????????? ????????? ????????? ????????? ????????????.

        List<ArticleTag> articleTags = articleTagRepository.findByArticle_Id(ootd.getId());
        List<String> old_tags_keyword = new ArrayList<>();
        List<String> new_tags_keyword = new ArrayList<>();
        List<Tag> old_tags = new ArrayList<>();

        // ????????? ?????? ??????????????? ??????
        if (ootdRequestDto.getTags().size() == 0) {
            List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(articleNo);

            for (ArticleTag at : articleTag) {
                System.out.println(at.getTag().getKeyword() + " ??????!");
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

            // 1. ?????? ?????? ????????? ????????? ????????? ?????? ?????? -> ??????
            if (!old_tags_keyword.contains(keyword)) {
                Tag tagE = Tag.builder()
                        .type(new_tag.getType())
                        .keyword(new_tag.getKeyword())
                        .build();
                // ?????? ?????? ???????????? ????????? ?????? ??????
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
            // 2. ?????? ????????? ?????????, ????????? ?????? ????????? ?????? ?????? => ??????
            if (!new_tags_keyword.contains(old_tag.getKeyword())) {
                articleTagRepository.deleteById(old_tag.getId());
//                tagRepository.deleteById(old_tag.getId());
            }
        }

        // ========================= ???????????? ?????? ================================
        // ?????? ?????? : 1, 2, 3 => 1, 2, 3, 4
        // ????????? ?????? : 2, 3, 4
        // 1. ????????? ????????? ???????????? ??????????????? ????????? ????????????.
        // 2. ?????? ????????? ???????????? ????????? ????????? ????????? ????????? ????????????.
        // ????????? ?????? ????????? ???????????? ??? ??????

        // ????????? ????????? ?????? ?????? ??????
        articlePhotoRepository.deleteAllByArticle_Id(articleNo);

        // ????????? ????????? ?????? ??????
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
        // ?????? ?????? ??????????????? contain("input%")??? ???????????? ?????? ????????????.
        List<Tag> tags = tagRepository.findAllByKeywordStartingWith(input);
        List<OotdSearchResponseDto> ootdSearchResponseDtoList = new ArrayList<>();

        HashMap<String, Long> tagMap = new HashMap<>();


        for (Tag tag : tags) {
            // ????????? ??????????
            if (tagMap.get(tag.getKeyword()) == null) {
                tagMap.put(tag.getKeyword(), 1L);
            } else {
                // ?????? ?????? ???????????? ?????? + 1
                tagMap.replace(tag.getKeyword(),tagMap.get(tag.getKeyword()) + 1);
            }

            // tag??? article??? ??????????????? ?????? ?????? articleTag??? tag_id??? ?????? ???????????????.
            List<ArticleTag> articleTagList = articleTagRepository.findAllByTag_Id(tag.getId());


            for (ArticleTag articleTag : articleTagList) {
                // articleTag??? ?????? ?????? ????????? ????????? ???????????? Id??? ?????? ???????????? ???????????????.
                Ootd ootd = ootdRepository.findById(articleTag.getArticle().getId()).orElseThrow();

                // ?????? ???????????? Id??? ?????? ?????????????????? ????????? ????????? ???????????????. (?????? ????????? ?????? ??? ?????? ?????????)
                ArticlePhoto articlePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId()).get(0);

                // ????????? ?????? ????????? ootdSearchResponseDto??? ???????????????. (??????, ?????? ???, ????????? ???
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


        // ???????????? ???????????? ??? ??????
        // ???????????? ??????, ????????? ?????? / ?????? ????????? ????????? ????????? ??????
        return  OotdSearchByHashtagResponseDto.builder()
                .ootdSearchResponseDtoList(ootdSearchResponseDtoList)
                .tagInfo(searchTagResponseDtoList)
                .build();
    }



//            select distinct at.article_id
//            from article_tag at
//            left join tag t
//            on t.id = at.tag_id
//            where t.keyword="?????????" or t.keyword="?????????" or t.keyword="????????????";
    public List<OotdListResponseDto> filterOotd(FilterOotdRequestDto filter, Pageable pageable, Long idx, Long userId) {


        List<String> styleTag = filter.getStyleTag();
        List<String> tpoTag = filter.getTpo();
        List<String> totalTags = new ArrayList<>();
        List<OotdListResponseDto> responseOotdList = new ArrayList<>();
        List<Long> followings = followRepository.findAllByFollowerId(userId).stream()
                .map(a -> a.getFollowing().getId())
                .collect(Collectors.toList());

        Long age = filter.getAge();
        Gender gender = filter.getGender();
        Date date = new Date();

        for (String s : styleTag) {
            totalTags.add(s);
        }

        for (String s : tpoTag) {
            totalTags.add(s);
        }

        System.out.println(styleTag + ", " + tpoTag + ", " + age + ", " + gender);

        // case:
        // 1. ?????? ????????? ???????????? ?????? ??????
        // 2. (styleTag or tpoTag)
        // 3. (styleTag or tpoTag) + ageTag
        // 4. (styleTag or tpoTag) + genderTag
        // 5. (styleTag or tpoTag) + ageTag + genderTag
        // 6. ageTag
        // 7. genderTag
        // 8. ageTag + genderTag

        // 1. ?????? ????????? ???????????? ?????? ??????
        if (styleTag.size() == 0 && tpoTag.size() == 0 && age == null && gender == null && filter.getCategory() == null) {
            return null;
        }

        // ????????? ????????? ????????? ??????
        if(filter.getCategory().equals("follow")){
            if (styleTag.size() == 0 && tpoTag.size() == 0 && age == null && gender == null) {
                System.out.println("only category : follow");
                System.out.println(followOotd(userId));
                return followOotd(userId);
            }
        }

        // 2. styleTag, tpoTag ??? ??? ???????????? null ??? ???????????? ??????.
        if ((styleTag.size() >= 1) || (tpoTag.size() >= 1)) {
            HashMap<Long, Long> map = new HashMap<>();

            List<Long> articleList = articleTagRepositoryImpl.findArticleByTags(styleTag, tpoTag, pageable, idx);
            List<Long> articleList2 = new ArrayList<>();

            // ????????? ????????? ???????????? ???????????? ??? ???????????? ????????? ????????? id?????? ???????????? map??? ??????.
            for (Long id : articleList) {
                if (map.get(id) == null) {
                    map.put(id, 1L);
                } else {
                    map.put(id, map.get(id) + 1);
                }
            }

            // keySet ??? ????????? ?????? ???????????? ???????????? ?????? ????????????.
            for (Long key : map.keySet()) {
                Long tagCnt = map.get(key);

                if (tagCnt >= totalTags.size()) { // ????????? ????????? ????????? ??? ????????? ????????? ??????
                    articleList2.add(key);
                }
            }


            for (Long id : articleList2) {
                System.out.println(id);
                // ?????? ????????? ?????? ?????? ?????????
                Ootd ootd = ootdRepository.findById(id).orElseThrow();
                User user = userRepository.findById(ootd.getUser().getId()).orElseThrow();

                // 3. ????????? ????????? ?????? ??????
                if (age != null) {
                    // ?????? ????????? ?????? ?????????
                    if (user.getAge() / 10 != age / 10) {
                        continue;
                    }
                }

                // 4. ?????? ????????? ?????? ??????
                if (gender != null) {
                    // ?????? ????????? ?????? ?????????
                    if (user.getGender() != gender) {
                        continue;
                    }
                }

                // 5. ?????????, ?????? ????????? ?????? ????????? ??????

                // ????????? ??????
                if(!followings.contains(ootd.getUser().getId())) continue;

                GapTimeVo gapTime = articleService.getGapTime(ootd, date);
                List<ArticlePhoto> responsePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId());


                // ?????? ?????? ????????? ???????????? ???
                responseOotdList.add(OotdListResponseDto.builder()
                        .id(ootd.getId())
                        .hit(ootd.getHit())
                        .content(ootd.getContent())
                        .imageUrl(responsePhoto.get(0).getImageUrl())
                        .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                        .time(gapTime.getTimeGapToString())
                        .pastTime(gapTime.getPastTime())
                        .userId(ootd.getUser().getId())
                        .build());
            }

            return responseOotdList;

        } else { // ??? ??? null ??? ?????? (?????? ???????????? ?????? ??????)
            List<Ootd> ootdList = new ArrayList<>();

            System.out.println(gender);
            System.out.println(age);

            // 8. ?????????, ?????? ?????? ???????????? ??? ??????

            if (age != null && gender != null) {
                ootdList = articleTagRepositoryImpl.findArticleByAgeAndGender(age, gender, pageable, idx);
            } else if (age != null && gender == null) { // 6. ????????? ????????? ????????? ??????
                ootdList = articleTagRepositoryImpl.findArticleByAge(age, pageable, idx);
            } else if (age == null && gender != null) { // 7. ?????? ????????? ????????? ??????
                ootdList = articleTagRepositoryImpl.findArticleByGender(gender, pageable, idx);
            }

            List<Ootd> result = new ArrayList<>();
            for (Ootd ootd : ootdList) {
                // ????????? ??????
                if(!followings.contains(ootd.getUser().getId())) continue;
                else result.add(ootd);
            }
            toOotdList(responseOotdList, date, result);
        }

        if (filter.getCategory() != null && filter.getCategory().equals("?????????")) {
            // ???????????? ????????? ?????? ??? ??????
            if (styleTag.size() == 0 && tpoTag.size() == 0 && age == null && gender == null) {
                List<Ootd> ootdList = articleTagRepositoryImpl.findArticleByPop(pageable, idx);
                toOotdList(responseOotdList, date, ootdList);
            } else {
                Collections.sort(responseOotdList, new CompareOotd(articleLikeRepository));
            }
        }

        return responseOotdList;
    }

    private void toOotdList(List<OotdListResponseDto> responseOotdList, Date date, List<Ootd> ootdList) {
        for (Ootd ootd : ootdList) {
            GapTimeVo gapTime = articleService.getGapTime(ootd, date);
            List<ArticlePhoto> responsePhoto = articlePhotoRepository.findAllByArticle_Id(ootd.getId());

            responseOotdList.add(OotdListResponseDto.builder()
                    .id(ootd.getId())
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
                    .imageUrl(responsePhoto.get(0).getImageUrl())
                    .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                    .time(gapTime.getTimeGapToString())
                    .pastTime(gapTime.getPastTime())
                    .userId(ootd.getUser().getId())
                    .build());
        }
    }



    // ?????? : article_tag??? createTime ?????? ??????
    // 1?????? ?????? ????????? article_tag ????????? ??????
    // group by tag_id count : ?????? ??? ?????? ?????????
    // ???????????? ?????? ~ 4????????? -> ???????????? ??? ???????????? ?????????
    // + ?????? ? ?????? ?????? ????????? ???????????? ???????????? ????????? 5??? ??????

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

        if(result.size() != 0){
            List<HotOotdResponseDto> hotList = hotIssueList(result.get(0).getId());
            result.get(0).setHotList(hotList);
        }
        
        return result;
    }

    public List<HotOotdResponseDto> hotIssueList(Long tagId) {
        // ?????? ????????? ???????????? ????????? ??? ????????????????????????????????
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
    public List<OotdListResponseDto> followOotd(Long id) {
//        select * from article
//        where user_id
//        in (select following_id from follow where follower_id = 2)
//        order by id desc;
        List<Article> articles = ootdRepositoryImpl.findByUserId(id);
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


@AllArgsConstructor
class CompareOotd implements Comparator<OotdListResponseDto> {
    private final ArticleLikeRepository articleLikeRepository;

    @Override
    public int compare(OotdListResponseDto o1, OotdListResponseDto o2) {
//        articleLikeRepository.findAllByArticle_Id(o1.getId()).size(); // ????????? ???
//        o1.getHit(); // ?????????
//        o1.getCommentCnt(); // ?????????

        long score1 = (o1.getCommentCnt() * 3) + (articleLikeRepository.findAllByArticle_Id(o1.getId()).size() * 2) + (o1.getHit());
        long score2 = (o2.getCommentCnt() * 3) + (articleLikeRepository.findAllByArticle_Id(o2.getId()).size() * 2) + (o2.getHit());

        if (score1 >= score2)
            return -1;
        return 1;
    }
}