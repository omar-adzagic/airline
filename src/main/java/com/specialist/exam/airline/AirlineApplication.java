package com.specialist.exam.airline;

import com.specialist.exam.airline.model.*;
import com.specialist.exam.airline.repository.*;
import com.specialist.exam.airline.services.FlightsService;
import com.specialist.exam.airline.services.PromotionsService;
import com.specialist.exam.airline.services.ReservationsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class AirlineApplication implements CommandLineRunner {
    public static void main(String[] args) {
        SpringApplication.run(AirlineApplication.class, args);
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AirplanesRepository airplanesRepository;
    @Autowired
    private FlightsRepository flightsRepository;
    @Autowired
    private ReservationsRepository reservationsRepository;
    @Autowired
    private FlightsService flightsService;
    @Autowired
    private ReservationsService reservationsService;
    @Autowired
    private PromotionsRepository promotionsRepository;
    @Autowired
    private PromotionsService promotionsService;

    @Override
    public void run(String... args) throws Exception {
        this.reservationsService.deleteAll();
        this.reservationsRepository.flush();
        this.promotionsService.deleteAll();
        this.promotionsRepository.flush();
        this.flightsService.deleteAll();
        this.userRepository.deleteAll();
        this.userRepository.flush();
        this.airplanesRepository.deleteAll();
        this.airplanesRepository.flush();

        User Zvonko = new User("Zvonko", "Bogdan", "zvonko@email.com", "zvonja", "12345678", true, "USER, ADMIN");
        this.userRepository.save(Zvonko);
        User Marko = new User("Marko", "Marković", "marko@email.com", "masja", "12345678", false, "USER, ADMIN");
        this.userRepository.save(Marko);
        User Ivan = new User("Ivan", "Ivanović", "ivan@email.com", "ivo", "12345678", true, "USER, ADMIN");
        this.userRepository.save(Ivan);

        Airplane boeing737 = new Airplane("Boeing 737", 150, 2003, true);
        this.airplanesRepository.save(boeing737);
        Airplane boeing747 = new Airplane("Boeing 747", 120, 1996, false);
        this.airplanesRepository.save(boeing747);
        Airplane airbusa320 = new Airplane("Airbus A320", 200, 2008, true);
        this.airplanesRepository.save(airbusa320);
        Airplane airbusa330 = new Airplane("Airbus A330", 210, 2011, true);
        this.airplanesRepository.save(airbusa330);

        Flight flight1 = new Flight(LocalDate.now().plusDays(5), LocalDate.now().plusDays(10), "Beograd", "Instanbul", Instant.now().plus(Duration.ofDays(30)), Instant.now().plus(Duration.ofDays(26)), 120, true, boeing737);
        this.flightsRepository.save(flight1);
        Flight flight2 = new Flight(LocalDate.now().plusDays(10), LocalDate.now().plusDays(20), "Tivat", "Moskva", Instant.now().plus(Duration.ofDays(20)), Instant.now().plus(Duration.ofDays(17)), 185, true, boeing747);
        this.flightsRepository.save(flight2);
        Flight flight3 = new Flight(LocalDate.now().plusDays(20), LocalDate.now().plusDays(30), "Beograd", "Frankfurt", Instant.now().plus(Duration.ofDays(10)), Instant.now().plus(Duration.ofDays(6)), 65, true, airbusa320);
        this.flightsRepository.save(flight3);

        Promotion promotion1 = new Promotion(flight1);
        this.promotionsRepository.save(promotion1);
        Promotion promotion2 = new Promotion(flight3);
        this.promotionsRepository.save(promotion2);

        Reservation reservation1 = new Reservation("S", Instant.now().plus(Duration.ofDays(2)), Zvonko, flight1);
        this.reservationsRepository.save(reservation1);
        Reservation reservation2 = new Reservation("A", Instant.now().plus(Duration.ofDays(4)), Marko, flight2);
        this.reservationsRepository.save(reservation2);
        Reservation reservation3 = new Reservation("S", Instant.now().plus(Duration.ofDays(5)), Ivan, flight3);
        this.reservationsRepository.save(reservation3);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedMethods("GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS", "HEAD");
            }
        };
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
