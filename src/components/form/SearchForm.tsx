import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { type FormEvent } from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

type SearchFormProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

const SearchForm = ({ userName, setUserName }: SearchFormProps) => {
  const [text, setText] = useState(userName);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === '') {
      toast.success('please enter a username');
      return;
    }
    setUserName(text);
  };
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-x-2 w-full lg:w-1/3 mb-1"
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          type="text"
          id="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search Github Users..."
          className="grow bg-background "
        />
        <Button type="submit">Search</Button>
      </form>
      <p className="text-gray-500 text-sm mb-8">
        Hint : you can try gaearon, torvalds, yyx990803, etc.
      </p>
    </div>
  );
};

export default SearchForm;
