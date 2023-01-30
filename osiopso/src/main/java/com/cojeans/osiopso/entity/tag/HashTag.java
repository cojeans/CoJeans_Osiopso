package com.cojeans.osiopso.entity.tag;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("H")
public class HashTag extends Tag {

}
