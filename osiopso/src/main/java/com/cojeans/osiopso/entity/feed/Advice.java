package com.cojeans.osiopso.entity.feed;

import com.cojeans.osiopso.entity.user.UserTest;
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

    public Advice(List<ArticlePhoto> photos, int hit, String content, String dtype, UserTest user, boolean isSelected, String subject) {
        super(photos, hit, content, dtype, user);
        this.isSelected = isSelected;
        this.subject = subject;
    }
}
