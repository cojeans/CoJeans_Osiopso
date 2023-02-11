package com.cojeans.osiopso.dto.response.feed;

import com.cojeans.osiopso.dto.tag.SearchTagResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
public class OotdSearchByHashtagResponseDto {

    private final List<SearchTagResponseDto> tagInfo;
    private final List<OotdSearchResponseDto> ootdSearchResponseDtoList;

}
