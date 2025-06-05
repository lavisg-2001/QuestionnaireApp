package com.questionpro.poll.repository;

import com.questionpro.poll.model.UserSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubmissionRepository extends JpaRepository<UserSubmission, Integer> {
    List<UserSubmission> findByEmailId(String email);
}
