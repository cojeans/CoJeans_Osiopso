package com.cojeans.osiopso.dto.user;


import com.cojeans.osiopso.entity.user.Gender;
import lombok.*;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class SignUpRequestDto {

    private NotificationEmail name;

    private NotificationEmail email;

    private NotificationEmail password;

    private int age = 0;

    private Gender gender = Gender.UNKNOWN;

    private NotificationEmail imageUrl = "UNKNOWN";


}
