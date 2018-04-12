CREATE FUNCTION  activities.calc_vo2_leger(kph float)
    RETURNS float
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN (2.209 + 3.1633 * kph);
    END $$
;
