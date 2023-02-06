package com.cojeans.osiopso.dto.response.feed;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
public class OotdSearchByHashtagResponseDto {

    private final HashMap<String, Long> tagInfo;
    private final List<OotdSearchResponseDto> ootdSearchResponseDtoList;

}
