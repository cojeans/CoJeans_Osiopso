package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.entity.feed.Advice;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.AdviceRepository;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class AdviceService {

    private final ArticleRepository articleRepository;
    private final AdviceRepository adviceRepository;


    public List<ArticleDto> listAdvice() {
        List<Advice> Advices = adviceRepository.findList();
        List<ArticleDto> articleDtos = new ArrayList<>();

        for (Advice advice : Advices) {
            ArticleDto dto = ArticleDto.builder()
                    .id(advice.getId())
                    .photos(advice.getPhotos())
                    .hit(advice.getHit())
                    .content(advice.getContent())
                    .createTime(advice.getCreateTime())
                    .dtype(advice.getDtype())
                    .modifyTime(advice.getModifyTime())
                    .tags(advice.getTags())
                    .userId(advice.getUser().getId())
                    .isSelected(advice.isSelected())
                    .subject(advice.getSubject())
                    .build();

            articleDtos.add(dto);
        }

        for (ArticleDto articleDto : articleDtos) {
            System.out.println(articleDto.toString());
        }

        return articleDtos;
    }







    public ArticleDto detailAdvice(Long feedNo) {
        Advice advice = adviceRepository.findById(feedNo).orElseThrow();

        return ArticleDto.builder()
                .id(advice.getId())
                .photos(advice.getPhotos())
                .hit(advice.getHit())
                .content(advice.getContent())
                .createTime(advice.getCreateTime())
                .dtype(advice.getDtype())
                .modifyTime(advice.getModifyTime())
                .tags(advice.getTags())
                .userId(advice.getUser().getId())
                .isSelected(advice.isSelected())
                .subject(advice.getSubject())
                .build();
    }


    public boolean editAdvice(Long articleNo, ArticleDto articleDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        ArticleDto editDto = ArticleDto.builder()
                .id(articleNo)
                .photos(articleDto.getPhotos())
                .hit(articleDto.getHit())
                .content(articleDto.getContent())
                .createTime(articleDto.getCreateTime())
                .dtype(articleDto.getDtype())
                .modifyTime(articleDto.getModifyTime())
                .tags(articleDto.getTags())
                .userId(articleDto.getUserId())
                .isSelected(articleDto.isSelected())
                .subject(articleDto.getSubject())
                .build();

        if (articleRepository.save(editDto.toEntity(article.getUser(), articleNo)) == null) {
            return false;
        } else {
            return true;
        }
    }
}
