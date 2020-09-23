package com.miko.petbook.mappers;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

public final class MapperUtils {
  
  public static String dateFormatter(Instant date) {
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.FULL)
                                                       .withLocale(Locale.getDefault())
                                                       .withZone(ZoneId.systemDefault());
    return dateFormatter.format(date);
  }
}