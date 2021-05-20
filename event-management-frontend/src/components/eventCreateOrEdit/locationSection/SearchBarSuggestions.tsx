import React, { useEffect } from 'react';
import useStylesSearchBar from '../../../styles/SearchBarStyle';
import { LocationType } from '../../../model/LocationType';
import { MAX_SUGGESTIONS_SHOWED } from './MapUtils';

interface Props {
  suggestions: LocationType[];
  suggestionSelected: (loc: LocationType) => void;
  setSuggestions: (suggestion: LocationType[]) => void;
}
const RenderSuggestions = (props: Props) => {
  const classesSearch = useStylesSearchBar();

  useEffect(() => {
    if (props.suggestions.length > MAX_SUGGESTIONS_SHOWED) {
      const firstSuggestions = props.suggestions.slice(0, 5);
      props.setSuggestions(firstSuggestions);
    }
  });

  return (
    <div className={classesSearch.containerSuggestions}>
      <ul className={classesSearch.suggestionsText}>
        {props.suggestions.map((location: LocationType) => (
          <li
            key={location.address}
            className={classesSearch.suggestedItem}
            onClick={() => props.suggestionSelected(location)}
          >
            {location.address}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RenderSuggestions;
