package com.cojeans.osiopso.dto.request.feed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticlePhotoRequestDto {

    private String imageUrl;
}
