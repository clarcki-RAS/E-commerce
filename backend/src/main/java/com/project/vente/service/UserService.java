package com.project.vente.service;

import com.project.vente.model.User;

public interface UserService {

	public User saveUser(User user);
	public User authenticate(User user);
	public User findById(Long userId);
}
