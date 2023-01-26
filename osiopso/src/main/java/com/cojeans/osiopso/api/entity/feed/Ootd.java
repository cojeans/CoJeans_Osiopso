package com.cojeans.osiopso.api.entity.feed;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@DiscriminatorValue("O")
public class Ootd extends Article {



}
