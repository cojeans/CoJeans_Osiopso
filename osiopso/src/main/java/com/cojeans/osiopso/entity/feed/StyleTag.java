package com.cojeans.osiopso.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("S")
public class StyleTag extends Tag{
}
