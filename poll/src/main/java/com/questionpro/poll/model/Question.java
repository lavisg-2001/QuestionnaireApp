package com.questionpro.poll.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.*;


@Getter
@Setter
@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String text;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Options> options;
}
