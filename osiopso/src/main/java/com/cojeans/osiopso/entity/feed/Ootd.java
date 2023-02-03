package com.cojeans.osiopso.entity.feed;

import com.cojeans.osiopso.entity.user.UserTest;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.List;

@Entity
@NoArgsConstructor
@DiscriminatorValue("O")
@SuperBuilder
public class Ootd extends Article {

    public Ootd(List<ArticlePhoto> photos, int hit, String content, String dtype, UserTest user) {
        super(photos, hit, content, dtype, user);
    }
}
