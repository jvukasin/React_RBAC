package com.master.backend.repository;

import com.master.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findOneByUsername(String username);
}
