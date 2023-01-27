package com.cojeans.osiopso.entity.tag;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("S")
public class StyleTag extends Tag{
}
