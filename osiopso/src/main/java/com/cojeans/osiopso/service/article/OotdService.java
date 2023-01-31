package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.feed.ArticleDto;
import com.cojeans.osiopso.dto.feed.ArticlePhotoDto;
import com.cojeans.osiopso.dto.feed.ArticleTagDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.user.User;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.article.OotdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class OotdService {

    private final ArticleRepository articleRepository;
    private final OotdRepository ootdRepository;
    private final Converter converter;

    public List<ArticleDto> listOotd() {
        List<Ootd> Ootds = ootdRepository.findList();
        List<ArticleDto> articleDtos = new ArrayList<>();

        for (Ootd ootd : Ootds) {
            ArticleDto dto = ArticleDto.builder()
                    .id(ootd.getId())
                    .photos(converter.toPhotoDto(ootd.getPhotos()))
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
                    .createTime(ootd.getCreateTime())
                    .dtype(ootd.getDtype())
                    .modifyTime(ootd.getModifyTime())
//                    .tags(converter.toTagDto(ootd.getTags()))
                    .userId(ootd.getUser().getId())
                    .build();

            articleDtos.add(dto);
        }

        for (ArticleDto articleDto : articleDtos) {
            System.out.println(articleDto.toString());
        }

        return articleDtos;
    }


    public ArticleDto detailOotd(Long articleNo) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();

        return ArticleDto.builder()
                .id(ootd.getId())
                .photos(converter.toPhotoDto(ootd.getPhotos()))
                .hit(ootd.getHit())
                .content(ootd.getContent())
                .createTime(ootd.getCreateTime())
                .dtype(ootd.getDtype())
                .modifyTime(ootd.getModifyTime())
//                .tags(converter.toTagDto(ootd.getTags()))
                .userId(ootd.getUser().getId())
                .build();
    }


    public boolean editOotd(Long articleNo, ArticleDto articleDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        ArticleDto editDto = ArticleDto.builder()
                .id(articleNo)
                .photos(articleDto.getPhotos())
                .hit(articleDto.getHit())
                .content(articleDto.getContent())
                .createTime(articleDto.getCreateTime())
                .dtype(articleDto.getDtype())
                .modifyTime(articleDto.getModifyTime())
//                .tags(articleDto.getTags())
                .userId(articleDto.getUserId())
                .build();

        if (articleRepository.save(editDto.toEntity(article.getUser(), articleNo)) == null) {
            return false;
        } else {
            return true;
        }
    }
}
