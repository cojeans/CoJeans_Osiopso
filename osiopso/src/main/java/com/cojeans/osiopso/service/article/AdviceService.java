package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.TagDto;
import com.cojeans.osiopso.dto.response.feed.ArticleResponseDto;
import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.entity.feed.*;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.repository.article.AdviceRepository;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.article.ArticleTagRepository;
import com.cojeans.osiopso.repository.article.TagRepository;
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
    private final Converter converter;


    public List<ArticleResponseDto> listAdvice() {
        List<Advice> Advices = adviceRepository.findList();
        List<ArticleResponseDto> articleRequestDtos = new ArrayList<>();

        for (Advice advice : Advices) {
            ArticleResponseDto dto = ArticleResponseDto.builder()
                    .id(advice.getId())
//                    .photos(converter.toPhotoDto(advice.getPhotos()))
                    .hit(advice.getHit())
                    .content(advice.getContent())
                    .createTime(advice.getCreateTime())
                    .modifyTime(advice.getModifyTime())
                    .userId(advice.getUser().getId())
                    .isSelected(advice.isSelected())
                    .subject(advice.getSubject())
                    .build();

            articleRequestDtos.add(dto);
        }

        for (ArticleResponseDto articleRequestDto : articleRequestDtos) {
            System.out.println(articleRequestDto.toString());
        }

        return articleRequestDtos;
    }



    // 1. param 으로 훈수 찾아오기
    // 2. 훈수 게시물 Id로 articleTag 찾아오기
    // 3. articleTag iterator 돌려서 id로 keyword
    public ArticleResponseDto detailAdvice(Long feedNo) {
        Advice advice = adviceRepository.findById(feedNo).orElseThrow();

        return ArticleResponseDto.builder()
                .id(advice.getId())
//                .photos(converter.toPhotoDto(advice.getPhotos()))
                .hit(advice.getHit())
                .createTime(advice.getCreateTime())
                .dtype(advice.getDtype())
                .modifyTime(advice.getModifyTime())
                .userId(advice.getUser().getId())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .build();
    }


    public boolean editAdvice(Long articleNo, ArticleRequestDto articleRequestDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        ArticleRequestDto editDto = ArticleRequestDto.builder()
                .photos(articleRequestDto.getPhotos())
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
