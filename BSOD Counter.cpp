///this program was made for the sole purpose of keeping track of how many BSODS you have had
/// this was made initially as a joke but it turned out to be a good way of tracking how many issues you have had
///
/// i may build apon this project and add features such as :
/// why did you BSOD
/// When did you BSOD
/// and so on
/// these features that ive mentioned can all be done with windbg and also for when did you BSOD....
/// the date and time is in the file name :/

///instructions:
///1, compile
///2, place compiled executable inside of your startup programs
///3, everytime your windows boots up this program will almost instantly check to see if this boot you had a bsod
/// coluld make this programm run on system boot but i think that would be overkill.
//basic includes needed for the program to run
#include <string>
#include <iostream>
#include <filesystem>
#include <fstream>
namespace fs = std::filesystem;

//there are quite a few better ways of doing this
//for example passing it the vector itself and actaully doing the writting inside of this function
//anotehr example could be passing the vector and then return another std::vector containing the non archived strings.
//or could even use std::pairs or ties

//checks our BSOD.txt file to see if any of the filenames match with our archive of BSODS

bool DoesBsodExist(const std::string filename, const std::string casearray){
	static std::string contents;
	static std::ifstream fin(filename);
	getline(fin, contents, char(-1));
	fin.close();

	//if it finds the occurence of our cases inside of the contents of the file
	//it will return true
	if (contents.find(casearray) != std::string::npos)
		return true;

	return false;
}

int main(){
	const std::string path = "C:\\Windows\\Minidump";
	//so we can read our file
	std::ofstream fileout;
	//creates a string vector for all of the dumps  to be pushed into
	std::vector<std::string>compare;
	fileout.open("BSODS.txt", std::ios::app);

	//loops through adn for each one is pushed to our vector
	for (auto Files : fs::directory_iterator(path))
		compare.push_back(Files.path().filename().string());
	//for each string inside of our array,we pass into our function
	//if bsod doesnt exist it shall push the name of the file into our archive
	for (std::string contents : compare)
		if (!DoesBsodExist("BSODS.txt", contents))
			fileout << contents << std::endl;

	fileout.close();
	//gets line count of BSODS.txt counts them and then returns into a seperate file
	std::ifstream inFile("BSODS.txt");
	static int BsodAmount = std::count(
		std::istreambuf_iterator<char>(inFile)
		, std::istreambuf_iterator<char>()
		, '\n');

	std::ofstream amount("Bsod Amount.txt");
	amount << BsodAmount << std::endl;
	amount.close();

	exit(1);
}