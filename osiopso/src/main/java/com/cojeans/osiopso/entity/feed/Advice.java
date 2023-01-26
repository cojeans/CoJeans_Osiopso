package com.cojeans.osiopso.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("A")
public class Advice  extends Article{

    boolean isSelected;

    String subject;
}
