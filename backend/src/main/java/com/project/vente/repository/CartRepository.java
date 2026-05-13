package com.project.vente.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.project.vente.model.Cart;
import com.project.vente.model.User;
import com.project.vente.request.CartChart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Cart c WHERE c.id = ?1")
	void deleteById(Long cartId);
	
	@Query(value="SELECT DATE_TRUNC('day', date_commande) AS day,*, SUM(price*quantity) AS total FROM Cart WHERE buyer_id = ? GROUP BY id,DATE_TRUNC('day', date_commande)", nativeQuery=true)
	List<Cart> findAllByDay(Long buyerId);
	
	@Query(value="SELECT DATE_TRUNC('day', date_commande) AS day, *, SUM(price*quantity) AS total FROM Cart WHERE buyer_id = ?1 AND DATE_TRUNC('day', date_commande) = to_date(?2, 'YYYY-MM-DD') GROUP BY id, DATE_TRUNC('day', date_commande)", nativeQuery=true)
	List<Cart> findAllByDayAndDate(Long buyerId, Date date);
	
	@Query("SELECT new com.project.vente.request.CartChart(SUM(c.price*c.quantity), MAX(c.price*c.quantity), MIN(c.price*c.quantity)) FROM Cart c WHERE c.buyerId = ?1")
	CartChart getChartData(@Param("buyerId")User buyerId);
}
