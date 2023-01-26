package com.cojeans.osiopso.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("O")
public class Ootd extends Article {

}
