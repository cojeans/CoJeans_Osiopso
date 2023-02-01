package com.cojeans.osiopso.service.article;

import com.cojeans.osiopso.dto.request.feed.ArticleRequestDto;
import com.cojeans.osiopso.dto.request.feed.TagDto;
import com.cojeans.osiopso.dto.response.feed.ArticleResponseDto;
import com.cojeans.osiopso.entity.feed.Article;
import com.cojeans.osiopso.entity.feed.ArticlePhoto;
import com.cojeans.osiopso.entity.feed.ArticleTag;
import com.cojeans.osiopso.entity.feed.Ootd;
import com.cojeans.osiopso.entity.tag.Tag;
import com.cojeans.osiopso.repository.article.ArticleRepository;
import com.cojeans.osiopso.repository.article.ArticleTagRepository;
import com.cojeans.osiopso.repository.article.OotdRepository;
import com.cojeans.osiopso.repository.article.TagRepository;
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
    private final Converter converter;

    public List<ArticleResponseDto> listOotd() {
        List<Ootd> Ootds = ootdRepository.findList();
        List<ArticleResponseDto> articleRequestDtos = new ArrayList<>();

        for (Ootd ootd : Ootds) {
            ArticleResponseDto dto = ArticleResponseDto.builder()
                    .id(ootd.getId())
//                    .photos(converter.toPhotoDto(ootd.getPhotos()))
                    .hit(ootd.getHit())
                    .content(ootd.getContent())
                    .createTime(ootd.getCreateTime())
                    .dtype(ootd.getDtype())
                    .modifyTime(ootd.getModifyTime())
//                    .tags(converter.toTagDto(ootd.getTags()))
                    .userId(ootd.getUser().getId())
                    .build();

            articleRequestDtos.add(dto);
        }

        for (ArticleResponseDto articleResponseDto : articleRequestDtos) {
            System.out.println(articleResponseDto.toString());
        }

        return articleRequestDtos;
    }


    public ArticleResponseDto detailOotd(Long articleNo) {
        Ootd ootd = ootdRepository.findById(articleNo).orElseThrow();

        List<ArticleTag> articleTag = articleTagRepository.findByArticle_Id(ootd.getId());
        List<TagDto> list = new ArrayList<>();

        for (ArticleTag at : articleTag) {
            Tag tagE = tagRepository.findById(at.getTag().getId()).orElseThrow();
            list.add(TagDto.builder()
                    .type(tagE.getType())
                    .keyword(tagE.getKeyword())
                    .build());
        }

//        List<ArticlePhoto> photos = ootd.getPhotos();
//        for (ArticlePhoto p : photos) {
//            System.out.println(p);
//        }


        return ArticleResponseDto.builder()
                .id(ootd.getId())
//                .photos(converter.toPhotoDto(ootd.getPhotos()))
                .hit(ootd.getHit())
                .content(ootd.getContent())
                .createTime(ootd.getCreateTime())
                .dtype(ootd.getDtype())
                .modifyTime(ootd.getModifyTime())
                .tags(list)
                .userId(ootd.getUser().getId())
                .build();
    }


    public boolean editOotd(Long articleNo, ArticleRequestDto articleRequestDto) {
        Article article = articleRepository.findById(articleNo).orElseThrow();

        ArticleRequestDto editDto = ArticleRequestDto.builder()
                .photos(articleRequestDto.getPhotos())
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
