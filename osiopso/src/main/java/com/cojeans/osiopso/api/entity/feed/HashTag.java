package com.cojeans.osiopso.api.entity.feed;


import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("H")
public class HashTag extends Tag {

}
