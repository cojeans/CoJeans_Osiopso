package com.cojeans.osiopso.dto.request.feed;

import com.cojeans.osiopso.dto.tag.ArticleTagResponseDto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import java.util.List;

@Data
@Builder
@Getter
public class AdviceRequestDto {

    private List<ArticlePhotoRequestDto> photos;
    private boolean isSelected;
    private String content;
    private String subject;
}
