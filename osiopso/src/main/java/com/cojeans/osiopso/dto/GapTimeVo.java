package com.cojeans.osiopso.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GapTimeVo {

    private Float pastTime;
    private String timeGapToString;
}
