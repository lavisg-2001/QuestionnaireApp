package com.questionpro.poll.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class UserSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email_id")
    private String emailId;

    private int score;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt = LocalDateTime.now();
}
