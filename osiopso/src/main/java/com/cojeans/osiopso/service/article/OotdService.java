package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
import com.cojeans.osiopso.dto.request.feed.ArticleTagRequestDto;
import com.cojeans.osiopso.dto.request.feed.OotdRequestDto;
import com.cojeans.osiopso.dto.response.comment.CommentLikeResponseDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class OotdService {

    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    private final ArticleRepository articleRepository;
    private final OotdRepository ootdRepository;
    private final ArticlePhotoRepository articlePhotoRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public boolean createOotd(OotdRequestDto ootdRequestDto, List<MultipartFile> pictures, Long id) {
        User user = userRepository.findById(id).orElseThrow();

        // 게시물 저장
        Ootd ootdSaved = ootdRepository.save(Ootd.builder()
                .user(user)
                .hit(0)
                .content(ootdRequestDto.getContent())
                .build());


        // 사진 저장
        for (MultipartFile picture : pictures) {
            String path = System.getProperty("user.dir"); // 현재 디렉토리
            File file = new File(path + "/src/main/resources/static/" + picture.getOriginalFilename());

            if(!file.getParentFile().exists()) file.getParentFile().mkdir();
            try {
                picture.transferTo(file);
            } catch (Exception e) {
                e.printStackTrace();
            }

            articlePhotoRepository.save(ArticlePhoto.builder()
                    .storeFilename(file.getPath())
                    .originFilename(file.getName())
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

        return true;
    }


    public List<OotdListResponseDto> listOotd() {
        List<Ootd> Ootds = ootdRepository.findList();
        List<OotdListResponseDto> list = new ArrayList<>();


        // 프론트와 필요한 리스트 데이터들 타협후에 완성할 예정
        for (Ootd ootd : Ootds) {
            OotdListResponseDto dto = OotdListResponseDto.builder()
                    .id(ootd.getId())
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
//                    .createTime(ootd.getCreateTime())
                    .dtype(ootd.getDtype())
//                    .modifyTime(ootd.getModifyTime())
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
                    .originFilename(ap.getOriginFilename())
                    .storeFilename(ap.getStoreFilename())
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


        // 댓글 좋아요 가져오기
        // 하나의 게시물에 등록된 여러개의 댓글에 대해 좋아요를 가져와야 한다.
        // DataFormat) x 번 댓글에 y 유저가 좋아요를 눌렀다.

        List<CommentLike> commentLikeList = commentLikeRepository.findAllByArticle_Id(articleNo);
        List<CommentLikeResponseDto> commentLikeResponseDtoList = new ArrayList<>();

        for (CommentLike cl : commentLikeList) {
            commentLikeResponseDtoList.add(CommentLikeResponseDto.builder()
                    .id(cl.getId())
                    .userId(cl.getUser().getId())
                    .commentId(cl.getComment().getId())
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
                .commentLikes(commentLikeResponseDtoList)
                .hit(ootd.getHit())
                .content(ootd.getContent())
                .build();
    }


    public boolean editOotd(Long articleNo, OotdRequestDto ootdRequestDto, List<MultipartFile> pictures, Long userId) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();

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
        for (MultipartFile picture : pictures) {
            String path = System.getProperty("user.dir"); // 현재 디렉토리
            File file = new File(path + "/src/main/resources/static/" + picture.getOriginalFilename());

            if(!file.getParentFile().exists()) file.getParentFile().mkdir();
            try {
                picture.transferTo(file);
            } catch (Exception e) {
                e.printStackTrace();
            }

            articlePhotoRepository.save(ArticlePhoto.builder()
                    .storeFilename(file.getPath())
                    .originFilename(file.getName())
                    .article(ootd)
                    .build());
        }


        articleRepository.save(Ootd.builder()
                .id(articleNo)
                .content(ootdRequestDto.getContent())
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
                        .photo(ArticlePhotoResponseDto.builder()
                                .storeFilename(articlePhoto.getStoreFilename())
                                .originFilename(articlePhoto.getOriginFilename())
                                .build())
                        .commentCnt((long) commentRepository.findAllByArticle_Id(ootd.getId()).size())
                        .likeCnt((long) articleLikeRepository.findAllByArticle_Id(ootd.getId()).size())
                        .build());
            }
        }

        // 프론트에 넘어가야 할 정보
        // 태그들의 종류, 종류당 개수 / 검색 결과로 보여줄 게시물 정보
        return  OotdSearchByHashtagResponseDto.builder()
                .ootdSearchResponseDtoList(ootdSearchResponseDtoList)
                .tagInfo(tagMap)
                .build();
    }

}
