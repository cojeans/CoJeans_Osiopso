package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserPhotoResponseDto {

    private String originFilename;
    private String storeFilename;
}
