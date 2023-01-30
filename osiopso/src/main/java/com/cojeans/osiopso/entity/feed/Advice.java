package com.cojeans.osiopso.entity.feed;

import com.cojeans.osiopso.entity.user.User;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.List;

@Entity
@NoArgsConstructor
@DiscriminatorValue("A")
@SuperBuilder
public class Advice extends Article{

    boolean isSelected;
    String subject;

    public Advice(List<ArticlePhoto> photos, int hit, String content, String dtype, User user, List<ArticleTag> tags, boolean isSelected, String subject) {
        super(photos, hit, content, dtype, user, tags);
        this.isSelected = isSelected;
        this.subject = subject;
    }
}
