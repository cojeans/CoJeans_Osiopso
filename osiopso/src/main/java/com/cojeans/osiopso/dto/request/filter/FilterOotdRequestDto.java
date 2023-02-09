package com.cojeans.osiopso.dto.request.filter;

import com.cojeans.osiopso.dto.user.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FilterOotdRequestDto {

    // keyword 받아야함
    private List<Long> styleTag;
    // keyword 받아야함
    private List<Long> tpo;
    private Gender gender;
    private Long age;
}
