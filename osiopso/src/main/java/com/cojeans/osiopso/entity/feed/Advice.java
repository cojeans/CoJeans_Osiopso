package com.cojeans.osiopso.entity.feed;

import com.cojeans.osiopso.entity.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.List;

@Entity
@NoArgsConstructor
@DiscriminatorValue("A")
@Getter
@ToString
@SuperBuilder
public class Advice extends Article{

    boolean isSelected;
    String subject;

    public Advice(int hit, String content, User user, boolean isSelected, String subject) {
        super(hit, content, user);
        this.isSelected = isSelected;
        this.subject = subject;
    }
}
