package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.repository.article.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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


    public ArticleDetailResponseDto detailOotd(Long articleNo) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();

        // 사진 가져오기
        List<ArticlePhoto> photoEntityList = articlePhotoRepository.findAllById(articleNo);
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


        return ArticleDetailResponseDto.builder()
                .id(ootd.getId())
                .hit(ootd.getHit())
                .photos(photoResponseDtoList)
                .content(ootd.getContent())
                .createTime(ootd.getCreateTime())
                .dtype(ootd.getDtype())
                .modifyTime(ootd.getModifyTime())
                .tags(tagResponseDtoList)
                .userId(ootd.getUser().getId())
                .commentLikes(commentLikeResponseDtoList)
                .articleLikes(articleLikeResponseDtoList)
                .build();
    }


    public boolean editOotd(Long articleNo, ArticleRequestDto articleRequestDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // ========================= 태그수정 로직 ================================
        // 기존 태그 : 1, 2, 3 => 1, 2, 3, 4
        // 새로운 태그 : 2, 3, 4
        // 1. 새로운 태그를 돌리면서 기존태그에 없다면 추가한다.
        // 2. 기존 태그를 돌리면서 추가할 새로운 태그에 없다면 삭제한다.

        List<ArticleTag> articleTags = articleTagRepository.findByArticle_Id(article.getId());
        List<String> old_tags_keyword = new ArrayList<>();
        List<String> new_tags_keyword = new ArrayList<>();
        List<Tag> old_tags = new ArrayList<>();

        // 태그를 모두 삭제하려는 경우
        if (articleRequestDto.getTags().size() == 0) {
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



        for (ArticleTagResponseDto new_tag : articleRequestDto.getTags()) {
            String keyword = new_tag.getKeyword();
            new_tags_keyword.add(keyword);

            // 1. 만약 기존 태그에 새로운 태그가 없는 경우 -> 저장
            if (!old_tags_keyword.contains(keyword)) {
                Tag tagE = new_tag.toEntity();
                // 기존 태그 리스트에 새로운 태그 추가
                old_tags.add(tagE);
                Tag tagSaved = tagRepository.save(tagE);

                ArticleTag articleTagE = ArticleTag.builder()
                        .article(article)
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

        ArticleRequestDto editDto = ArticleRequestDto.builder()
                .dtype(articleRequestDto.getDtype())
                .content(articleRequestDto.getContent())
                .createTime(articleRequestDto.getCreateTime())
                .modifyTime(articleRequestDto.getModifyTime())
                .build();

        if (articleRepository.save(editDto.toEntity(article.getUser(), articleNo)) == null) {
            return false;
        } else {
            return true;
        }
    }
}
