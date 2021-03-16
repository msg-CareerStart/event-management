import React from 'react';
import useStylesSearchBar from '../../../styles/SearchBarStyle';
import { LocationType } from '../../../model/LocationType';

interface Props {
  suggestions: LocationType[];
  suggestionSelected: (name: string) => void;
  setSuggestions: (suggestion: LocationType[]) => void;
}
const RenderSuggestions = (props: Props) => {
  const classesSearch = useStylesSearchBar();

  if (props.suggestions.length === 0) {
    return null;
  } else {
    if (props.suggestions.length > 4) {
      const firstSuggestions = props.suggestions.slice(0, 4);
      props.setSuggestions(firstSuggestions);
    }
  }

  return (
    <div className={classesSearch.containerSuggestions}>
      <ul className={classesSearch.suggestionsText}>
        {props.suggestions.map((location: LocationType) => (
          <li
            key={location.id}
            className={classesSearch.suggestedItem}
            onClick={() => props.suggestionSelected(location.name)}
          >
            {location.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RenderSuggestions;
