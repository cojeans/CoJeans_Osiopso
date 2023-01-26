package com.cojeans.osiopso.api.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("S")
public class StyleTag extends Tag{
}
