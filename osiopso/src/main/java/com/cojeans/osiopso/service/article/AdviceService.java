package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.response.feed.*;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.repository.article.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class AdviceService {

    private final ArticleRepository articleRepository;
    private final AdviceRepository adviceRepository;
    private final ArticlePhotoRepository photoRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final ArticleLikeRepository articleLikeRepository;


    public List<AdviceListResponseDto> listAdvice() {
        List<Advice> Advices = adviceRepository.findList();
        List<AdviceListResponseDto> list = new ArrayList<>();


        // 프론트와 필요한 리스트 데이터들 타협후에 완성할 예정
        for (Advice advice : Advices) {
            AdviceListResponseDto dto = AdviceListResponseDto.builder()
                    .build();
            list.add(dto);
        }

        for (AdviceListResponseDto response : list) {
            System.out.println(response.toString());
        }

        return list;
    }



    // 1. param 으로 훈수 찾아오기
    // 2. 훈수 게시물 Id로 articleTag 찾아오기
    // 3. articleTag iterator 돌려서 id로 keyword
    public ArticleDetailResponseDto detailAdvice(Long articleNo) {
        Advice advice = adviceRepository.findById(articleNo).orElseThrow();

        // 사진 가져오기
        List<ArticlePhoto> photoEntityList = photoRepository.findAllById(advice.getId());
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


        return ArticleDetailResponseDto.builder()
                .id(advice.getId())
                .hit(advice.getHit())
                .content(advice.getContent())
                .createTime(advice.getCreateTime())
                .dtype(advice.getDtype())
                .photos(photoResponseDtoList)
                .modifyTime(advice.getModifyTime())
                .userId(advice.getUser().getId())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .articleLikes(articleLikeResponseDtoList)
                .commentLikes(commentLikeResponseDtoList)
                .build();
    }


    public boolean editAdvice(Long articleNo, ArticleRequestDto articleRequestDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        ArticleRequestDto editDto = ArticleRequestDto.builder()
                .dtype(articleRequestDto.getDtype())
                .content(articleRequestDto.getContent())
                .createTime(articleRequestDto.getCreateTime())
                .modifyTime(articleRequestDto.getModifyTime())
                .isSelected(articleRequestDto.isSelected())
                .subject(articleRequestDto.getSubject())
                .build();

        if (articleRepository.save(editDto.toEntity(article.getUser(), articleNo)) == null) {
            return false;
        } else {
            return true;
        }
    }

}