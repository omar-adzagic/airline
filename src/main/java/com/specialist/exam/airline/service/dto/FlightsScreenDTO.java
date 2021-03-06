package com.specialist.exam.airline.service.dto;

import com.specialist.exam.airline.domain.Airplane;
import com.specialist.exam.airline.domain.Flight;

import java.util.List;

public class FlightsScreenDTO {
    private List<Flight> flights;
    private List<String> citiesFrom;
    private List<String> citiesTo;
    private List<Airplane> airplanes;

    public List<Flight> getFlights() {
        return flights;
    }

    public void setFlights(List<Flight> flights) {
        this.flights = flights;
    }

    public List<String> getCitiesFrom() {
        return citiesFrom;
    }

    public void setCitiesFrom(List<String> citiesFrom) {
        this.citiesFrom = citiesFrom;
    }

    public List<String> getCitiesTo() {
        return citiesTo;
    }

    public void setCitiesTo(List<String> citiesTo) {
        this.citiesTo = citiesTo;
    }

    public List<Airplane> getAirplanes() {
        return airplanes;
    }

    public void setAirplanes(List<Airplane> airplanes) {
        this.airplanes = airplanes;
    }
}
