package com.cojeans.osiopso.api.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@DiscriminatorValue("A")
public class Advice  extends Article{

    boolean isSelected;

    String subject;

}
