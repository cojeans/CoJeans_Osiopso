package com.cojeans.osiopso.dto.request.filter;

import com.cojeans.osiopso.dto.user.Gender;

import java.util.List;

public class FilterOotdRequestDto {

    private List<FilterStyleTagRequestDto> styleTag;
    private List<FilterTpoRequestDto> tpo;
    private Gender gender;
    private Long age;
}
