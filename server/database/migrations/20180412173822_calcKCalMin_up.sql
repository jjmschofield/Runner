CREATE FUNCTION  activities.calc_kcal_min(mass_kg float, vo2 float, respiratory_exchange_ratio float )
    RETURNS float
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN (respiratory_exchange_ratio * mass_kg * vo2 / 1000);
    END $$
;
