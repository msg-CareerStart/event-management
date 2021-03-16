package ro.msg.event_management.controller.converter;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public interface Converter<S, D> {
    D convert(S obj);

    default List<D> convertAll(List<S> objList) {
        return objList.stream().map(this::convert).filter(Objects::nonNull).collect(Collectors.toList());
    }
}
