package com.cojeans.osiopso.api.entity.closet;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("T")
public class TpoTag extends  Tag{
}
