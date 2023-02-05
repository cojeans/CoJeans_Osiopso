package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticlePhotoRequestDto;
//import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.repository.article.*;
import com.cojeans.osiopso.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleTagRepository articleTagRepository;
    private final ArticlePhotoRepository articlePhotoRepository;
    private final TagRepository tagRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;


    // 1. 게시물 먼저 저장
    // 2. Dto 필드 중, 태그의 개수만큼 태그 저장
    // 3. ArticleTag 에 게시물과 유저를 넣고 저장
//    public boolean createArticle(ArticleRequestDto articleRequestDto, Long id) {
//        // 게시물 저장
//        List<ArticleTagResponseDto> tags = articleRequestDto.getTags();
//
//        Article article = articleRequestDto.toEntity(userRepository.getById(id), 0L);
//        Article savedArticle = articleRepository.save(article);
//
//
//        List<ArticlePhotoRequestDto> photos = articleRequestDto.getPhotos();
//
//        // 사진 저장
//        for (ArticlePhotoRequestDto photo : photos) {
//            articlePhotoRepository.save(ArticlePhoto.builder()
//                    .storeFilename(photo.getStoreFilename())
//                    .originFilename(photo.getOriginFilename())
//                    .article(savedArticle)
//                    .build());
//        }
//
//        if (tags != null) {
//            // 태그 저장
//            for (ArticleTagResponseDto tag : tags) {
//                Tag tagE = tag.toEntity();
//                Tag tagSaved = tagRepository.save(tagE);
//
//                ArticleTag articleTagE = ArticleTag.builder()
//                        .article(article)
//                        .tag(tagSaved)
//                        .build();
//
//                articleTagRepository.save(articleTagE);
//            }
//        }
//
//        return true;
//    }


    // 1번 article 을 지울 때..
    // 1번 article 을 외래키로 가진 article_tag 조회
    // 해당 article_tag 의 tag_id를 찾아서 tag 삭제
    // 해당 article_tag 삭제
    // 게시물 삭제
    public boolean deleteArticle(Long articleNo, Long userId) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        // 게시글 작성자만 삭제권한이 있다.
        if (userId != article.getUser().getId()) {
            return false;
        }

        // 게시물과 관련된 태그들 삭제
        List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(articleNo);
        for (ArticleTag at : articleTag) {
            articleTagRepository.deleteById(at.getId());
            tagRepository.deleteById(at.getTag().getId());
        }

        // 게시물과 관련된 사진삭제
        articlePhotoRepository.deleteByArticle_Id(articleNo);
        Long articleId = articleRepository.findById(articleNo).orElseThrow().getId();

        // 게시물과 관련된 댓글들 삭제
        commentRepository.deleteByArticle_Id(articleNo);

        // 게시물 삭제
        articleRepository.deleteById(articleId);

        // 확실히 지워진 경우 (삭제한 articleNo로 해당 게시물을 찾을 수 없어야 한다.)
        if (articleRepository.findById(articleNo).isEmpty()) {
            return true;
        } else {
            return false;
        }
    }
}