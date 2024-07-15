import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardPage({ header, body, button }) {
  return (
    <Card className="mt-6 ml-96 w-96 rounded p-7 shadow-xl bg-main transition duration-300 hover:shadow-main hover:bg-main-dark">
      <CardBody>
        <div className="flex items-center mb-4">
          <Typography variant="h5" color="blue-gray" className="font-bold">
            {header}
          </Typography>
        </div>
        <Typography className="mb-4 text-gray-700">
          {body}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="text" className="text-blue-500 flex items-center">
          {button}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardPage;
