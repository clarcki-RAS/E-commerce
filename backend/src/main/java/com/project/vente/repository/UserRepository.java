package com.project.vente.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.vente.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
	User findByEmail(@Param("email")String email);
}
