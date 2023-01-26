package com.cojeans.osiopso.entity.feed;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("H")
public class HashTag extends Tag {

}
