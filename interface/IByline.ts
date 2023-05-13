import IPerson from "./IPerson";

interface IByline {
    original: string;
    person: IPerson[];
    organization: string;
}

export default IByline